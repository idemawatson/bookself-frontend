import { useAuth0 } from '@auth0/auth0-react'
import { Button, Paper, Typography } from '@mui/material'

const Home: React.FC = () => {
  const { logout } = useAuth0()
  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'primary.main',
      }}
    >
      <Typography variant='h6' sx={{ my: 1, color: 'primary.contrastText' }}>
        Home
      </Typography>
      <Button onClick={() => logout()}>logout</Button>
    </Paper>
  )
}

export default Home
