import { BaseButton } from '@/components/uiParts/BaseButton'
import { useLoading } from '@/components/uiParts/TheLoading/hooks'
import { useNotification } from '@/components/uiParts/TheNotificationToast/hooks'
import { useToken } from '@/hooks/staticSWR/useAccessToken'
import { useUser } from '@/hooks/useUser'
import getBackendAPIServiceClient from '@/libs/APIServiceClient/BackendAPIServiceClient'
import { Alert, AlertTitle, Box, Divider, List, ListItem, ListItemText } from '@mui/material'
import React, { FC } from 'react'

const FollowRequestList: FC = () => {
  const { data: user, mutate } = useUser()
  const { token } = useToken()
  const { showSuccess, showError } = useNotification()
  const { showLoading, hideLoading } = useLoading()
  const deny = async (user_id: string) => {
    try {
      showLoading()
      const client = getBackendAPIServiceClient(token)
      await client.delete(`/followreq?user_id=${user_id}`)
      mutate()
    } catch (error) {
      console.error(error)
      showError('エラーが発生しました')
    } finally {
      hideLoading()
    }
  }
  const accept = async (user_id: string) => {
    try {
      showLoading()
      const client = getBackendAPIServiceClient(token)
      await client.patch(`/followreq?user_id=${user_id}`, {})
      showSuccess('フォローリクエストを承認しました')
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
      {user.requestFollowers.length > 0 ? (
        <List sx={{ bgcolor: 'background.paper', p: 0 }}>
          <>
            {user.requestFollowers.map((requestFollower, idx) => (
              <React.Fragment key={requestFollower.id}>
                <ListItem alignItems='flex-start'>
                  <ListItemText primary={requestFollower.name} />
                  <BaseButton
                    color='primary'
                    onClick={() => accept(requestFollower.id)}
                    size='small'
                    sx={{ mx: 1 }}
                  >
                    承認
                  </BaseButton>
                  <BaseButton
                    color='secondary'
                    onClick={() => deny(requestFollower.id)}
                    size='small'
                  >
                    拒否
                  </BaseButton>
                </ListItem>
                {idx === user.requestFollowers.length - 1 || <Divider />}
              </React.Fragment>
            ))}
          </>
        </List>
      ) : (
        <Alert severity='info' sx={{ mt: 2 }}>
          <AlertTitle>Info</AlertTitle>
          <div>フォローリクエストがありません</div>
        </Alert>
      )}
    </Box>
  )
}

export default FollowRequestList
