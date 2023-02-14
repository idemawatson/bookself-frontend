import { BaseButton } from '@/components/uiParts/BaseButton'
import { useLoading } from '@/components/uiParts/TheLoading/hooks'
import { useNotification } from '@/components/uiParts/TheNotificationToast/hooks'
import { useToken } from '@/hooks/staticSWR/useAccessToken'
import getBackendAPIServiceClient from '@/libs/APIServiceClient/BackendAPIServiceClient'
import { ClientUser } from '@/types/UserResponse'
import { Add } from '@mui/icons-material'
import { Divider, List, ListItem, ListItemText, Typography } from '@mui/material'
import axios from 'axios'
import React, { FC } from 'react'
import { KeyedMutator } from 'swr'

type Props = {
  users: ClientUser[]
  mutate: KeyedMutator<ClientUser[]>
}

const FollowingSearchResultList: FC<Props> = ({ users, mutate }) => {
  const { showLoading, hideLoading } = useLoading()
  const { showSuccess, showError } = useNotification()
  const { token } = useToken()
  const createFollowRequest = async (user_id: string) => {
    try {
      showLoading()
      await getBackendAPIServiceClient(token).put('followings', { user_id })
      showSuccess('フォローリクエストを送信しました')
      mutate()
    } catch (err) {
      console.error(err)
      let message = 'フォローリクエストを送れませんでした'
      if (axios.isAxiosError(err)) {
        const errorType = err.response?.data.type
        if (errorType === 'duplicate-follow') message = '既にフォロー済みです'
        else if (errorType === 'not-unique-relationship') message = '既にリクエスト済みです'
      }
      showError(message)
    } finally {
      hideLoading()
    }
  }
  return (
    <List sx={{ bgcolor: 'background.paper', p: 0 }}>
      <>
        {users.map((user) => (
          <React.Fragment key={user.id}>
            <ListItem alignItems='flex-start'>
              <ListItemText primary={user.name} />
              {!user.following ? (
                <BaseButton
                  color='primary'
                  onClick={() => {
                    createFollowRequest(user.id)
                  }}
                  size='small'
                >
                  <Add />
                  フォローリクエスト
                </BaseButton>
              ) : (
                <Typography>フォロー済み</Typography>
              )}
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </>
    </List>
  )
}

export default FollowingSearchResultList
