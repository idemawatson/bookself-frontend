import FollowerList from '@/components/organisms/profile/FollowerList'
import FollowingList from '@/components/organisms/profile/FollowingList'
import ProfileCard from '@/components/organisms/profile/ProfileCard'
import { Tab, Tabs } from '@mui/material'
import { FC, Suspense, SyntheticEvent } from 'react'
import { useFollowerTab } from './useFollowerTab'

type Props = {}
const ProfileTemplate: FC<Props> = () => {
  const { followerTab, setFollowerTab } = useFollowerTab()
  const handleChange = (_: SyntheticEvent<Element, Event>, value: number) => {
    setFollowerTab(value)
  }
  const renderFollower = () => {
    if (followerTab === 0) return <FollowingList></FollowingList>
    if (followerTab === 1) return <FollowerList></FollowerList>
  }
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ProfileCard />
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
        </Tabs>
        {renderFollower()}
      </Suspense>
    </>
  )
}

export default ProfileTemplate
