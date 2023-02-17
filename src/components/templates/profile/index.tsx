import ProfilePaper from '@/components/organisms/profile/ProfilePaper'
import SkeletonProfilePaper from '@/components/organisms/profile/ProfileSkeletonPaper'
import { FC, Suspense } from 'react'

type Props = {}
const ProfileTemplate: FC<Props> = () => {
  return (
    <>
      <Suspense fallback={<SkeletonProfilePaper />}>
        <ProfilePaper />
      </Suspense>
    </>
  )
}

export default ProfileTemplate
