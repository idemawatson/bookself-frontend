import { useUser } from '@/hooks/useUser'
import { Card, CardContent, Container, Typography } from '@mui/material'
import { FC } from 'react'

const ProfileCard: FC = () => {
  const { data: user } = useUser()
  if (!user) return <></>
  return (
    <>
      <Container>
        <Card elevation={0}>
          <CardContent>
            <Typography>ユーザー名：{user.name}</Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}

export default ProfileCard
