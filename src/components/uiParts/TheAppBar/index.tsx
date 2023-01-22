import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { useAuth0 } from '@auth0/auth0-react'

const TheAppBar: React.FC = () => {
  const { logout } = useAuth0()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed' sx={{ backgroundColor: 'primary' }}>
        <Toolbar variant='dense'>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            BookSelf
          </Typography>
          <Button onClick={() => logout()} color='inherit'>
            ログアウト
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default TheAppBar
