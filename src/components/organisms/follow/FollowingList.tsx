import { BaseButton } from '@/components/uiParts/BaseButton'
import { useLoading } from '@/components/uiParts/TheLoading/hooks'
import { useNotification } from '@/components/uiParts/TheNotificationToast/hooks'
import { useToken } from '@/hooks/staticSWR/useAccessToken'
import { useUser } from '@/hooks/useUser'
import getBackendAPIServiceClient from '@/libs/APIServiceClient/BackendAPIServiceClient'
import { Alert, AlertTitle, Box, Divider, List, ListItem, ListItemText } from '@mui/material'
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
      await client.delete(`/followings?user_id=${user_id}`)
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
        <List sx={{ bgcolor: 'background.paper', p: 0 }}>
          <>
            {user.followings.map((following, idx) => (
              <React.Fragment key={following.id}>
                <ListItem alignItems='flex-start'>
                  <ListItemText primary={following.name} />
                  <BaseButton color='secondary' onClick={() => unfollow(following.id)} size='small'>
                    フォロー解除
                  </BaseButton>
                </ListItem>
                {idx === user.followers.length - 1 || <Divider />}
              </React.Fragment>
            ))}
          </>
        </List>
      ) : (
        <Alert severity='info' sx={{ mt: 2 }}>
          <AlertTitle>Info</AlertTitle>
          <div>誰もフォローしていません</div>
        </Alert>
      )}
    </Box>
  )
}

export default FollowingList
