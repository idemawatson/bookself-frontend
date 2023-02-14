import ProfilePaper from '@/components/organisms/profile/ProfilePaper'
import { FC, Suspense } from 'react'

type Props = {}
const ProfileTemplate: FC<Props> = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ProfilePaper />
      </Suspense>
    </>
  )
}

export default ProfileTemplate
