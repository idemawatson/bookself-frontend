import FollowerList from '@/components/organisms/follow/FollowerList'
import FollowingList from '@/components/organisms/follow/FollowingList'
import FollowingSearchDrawer from '@/components/organisms/follow/FollowingSearchDrawer'
import FollowRequestList from '@/components/organisms/follow/FollowRequestList'
import { useUser } from '@/hooks/useUser'
import { Box, Divider, Paper, Tab, Tabs } from '@mui/material'
import { FC, Suspense, SyntheticEvent } from 'react'
import { useFollowerTab } from './useFollowerTab'

type Props = {}
const FollowTemplate: FC<Props> = () => {
  const { followerTab, setFollowerTab } = useFollowerTab()
  const handleChange = (_: SyntheticEvent<Element, Event>, value: number) => {
    setFollowerTab(value)
  }
  const renderFollower = () => {
    if (followerTab === 0) return <FollowingList />
    if (followerTab === 1) return <FollowerList />
    if (followerTab === 2) return <FollowRequestList />
  }
  return (
    <>
      <Box sx={{ my: 1, mx: 2 }}>
        {/* <BaseButton color='secondary' onClick={() => mutate()}>
          <Refresh />
        </BaseButton> */}
        <FollowingSearchDrawer />
      </Box>
      <Paper elevation={0} sx={{ mx: 2 }}>
        <Tabs
          value={followerTab}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              backgroundColor: '#101010',
              height: '0',
            },
          }}
        >
          <Tab label='フォロー' />
          <Tab label='フォロワー' />
          <Tab label='フォローリクエスト' />
        </Tabs>
        <Divider></Divider>
      </Paper>
      <Suspense fallback={<div>Loading...</div>}>{renderFollower()}</Suspense>
    </>
  )
}

export default FollowTemplate
