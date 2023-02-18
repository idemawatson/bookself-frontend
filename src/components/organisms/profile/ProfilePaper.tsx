import { useUser } from '@/hooks/useUser'
import { Container, LinearProgress, Paper, styled, Typography } from '@mui/material'
import { FC, ReactElement } from 'react'

const ProfilePaper: FC = () => {
  const { data: user } = useUser()
  if (!user) return <></>

  const StyledLinearProgress = styled(LinearProgress)({
    height: 15,
  })

  const StatusPaper: FC<{ title: string; value: string | number; children?: ReactElement }> = ({
    title,
    value,
    children,
  }) => {
    return (
      <Paper elevation={0} sx={{ py: 1, px: 2, my: 2 }}>
        <Typography sx={{ fontSize: 24, fontWeight: 500, color: 'gray' }}>{title}</Typography>
        <Typography
          sx={{
            textAlign: 'right',
            pr: 2,
            fontSize: 40,
            fontWeight: 'bold',
            color: 'primary.main',
          }}
        >
          {value}
        </Typography>
        {children}
      </Paper>
    )
  }
  return (
    <>
      <Container>
        <StatusPaper title='読書レベル' value={user.level}>
          <>
            <StyledLinearProgress variant='determinate' value={user.progress} />
            <Typography sx={{ textAlign: 'right', color: 'gray', pt: 1 }}>
              次のレベルまで{user.restExperience}ページ
            </Typography>
          </>
        </StatusPaper>
        <StatusPaper title='読んだ本' value={`${user.bookCount}冊`} />
        <StatusPaper title='総読書量' value={`${user.allPages}ページ`} />
      </Container>
    </>
  )
}

export default ProfilePaper
