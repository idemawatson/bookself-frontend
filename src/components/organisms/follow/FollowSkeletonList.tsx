import { Box, Divider, List, ListItem, ListItemText, Skeleton, Typography } from '@mui/material'
import React, { FC } from 'react'

const FollowSkeletonList: FC = () => {
  return (
    <Box sx={{ mx: 2 }}>
      <List sx={{ bgcolor: 'background.paper', p: 0 }}>
        {[...Array(12)].map((_, i) => (
          <React.Fragment key={i}>
            <ListItem alignItems='flex-start'>
              <ListItemText>
                <Typography>
                  <Skeleton />
                </Typography>
              </ListItemText>
            </ListItem>
            {i === 12 || <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  )
}

export default FollowSkeletonList
