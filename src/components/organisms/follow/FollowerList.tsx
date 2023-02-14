import { BaseButton } from '@/components/uiParts/BaseButton'
import { useLoading } from '@/components/uiParts/TheLoading/hooks'
import { useNotification } from '@/components/uiParts/TheNotificationToast/hooks'
import { useToken } from '@/hooks/staticSWR/useAccessToken'
import { useUser } from '@/hooks/useUser'
import getBackendAPIServiceClient from '@/libs/APIServiceClient/BackendAPIServiceClient'
import { Alert, AlertTitle, Box, Divider, List, ListItem, ListItemText } from '@mui/material'
import React, { FC } from 'react'

const FollowerList: FC = () => {
  const { data: user, mutate } = useUser()
  const { token } = useToken()
  const { showSuccess, showError } = useNotification()
  const { showLoading, hideLoading } = useLoading()
  const unfollow = async (user_id: string) => {
    try {
      showLoading()
      const client = getBackendAPIServiceClient(token)
      await client.delete(`/followers?user_id=${user_id}`)
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
      {user.followers.length > 0 ? (
        <List sx={{ bgcolor: 'background.paper', p: 0 }}>
          <>
            {user.followers.map((follower, idx) => (
              <React.Fragment key={follower.id}>
                <ListItem alignItems='flex-start'>
                  <ListItemText primary={follower.name} />
                  <BaseButton color='secondary' onClick={() => unfollow(follower.id)} size='small'>
                    ブロック
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
          <div>フォロワーがまだいません。</div>
        </Alert>
      )}
    </Box>
  )
}

export default FollowerList
