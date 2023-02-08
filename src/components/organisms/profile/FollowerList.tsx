import { useUser } from '@/hooks/useUser'
import { Box, Divider, List, ListItem, ListItemText, Typography } from '@mui/material'
import React, { FC } from 'react'

const FollowerList: FC = () => {
  const { data: user } = useUser()
  if (!user) return <></>
  return (
    <Box sx={{ mx: 2 }}>
      {user.followers.length > 0 ? (
        <List sx={{ bgcolor: 'background.paper' }}>
          <>
            {user.followers.map((follower, idx) => (
              <React.Fragment key={follower.id}>
                <ListItem alignItems='flex-start'>
                  <ListItemText primary={follower.name} />
                </ListItem>
                {idx === user.followers.length - 1 || <Divider />}
              </React.Fragment>
            ))}
          </>
        </List>
      ) : (
        <Typography>フォロワーがまだいません。</Typography>
      )}
    </Box>
  )
}

export default FollowerList
