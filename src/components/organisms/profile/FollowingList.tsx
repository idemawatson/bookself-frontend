import { BaseButton } from '@/components/uiParts/BaseButton'
import { useLoading } from '@/components/uiParts/TheLoading/hooks'
import { useNotification } from '@/components/uiParts/TheNotificationToast/hooks'
import { useToken } from '@/hooks/staticSWR/useAccessToken'
import { useUser } from '@/hooks/useUser'
import getBackendAPIServiceClient from '@/libs/APIServiceClient/BackendAPIServiceClient'
import { Box, Divider, List, ListItem, ListItemText, Typography } from '@mui/material'
import React, { FC } from 'react'

const FollowingList: FC = () => {
  const { data: user, mutate } = useUser()
  const { token } = useToken()
  const { showSuccess, showError } = useNotification()
  const { showLoading, hideLoading } = useLoading()
  const unfollow = async (user_id: string) => {
    try {
      showLoading()
      const client = getBackendAPIServiceClient(token)
      await client.delete(`/follow?user_id=${user_id}`)
      showSuccess('フォロー解除しました')
      mutate()
    } catch (error) {
      console.error(error)
      showError('エラーが発生しました')
    } finally {
      hideLoading()
    }
  }
  if (!user) return <></>
  return (
    <Box sx={{ mx: 2 }}>
      {user.followings.length > 0 ? (
        <List sx={{ bgcolor: 'background.paper' }}>
          <>
            {user.followings.map((following, idx) => (
              <React.Fragment key={following.id}>
                <ListItem alignItems='flex-start'>
                  <ListItemText primary={following.name} />
                  <BaseButton color='primary' onClick={() => unfollow(following.id)}>
                    フォロー解除
                  </BaseButton>
                </ListItem>
                {idx === user.followers.length - 1 || <Divider />}
              </React.Fragment>
            ))}
          </>
        </List>
      ) : (
        <Typography>誰もフォローしていません</Typography>
      )}
    </Box>
  )
}

export default FollowingList
