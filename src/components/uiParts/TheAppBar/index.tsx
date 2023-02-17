import AnalyticsTemplate from '@/components/templates/analytics'
import { useUser } from '@/hooks/useUser'
import { InsertChart } from '@mui/icons-material'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import { useRouter } from 'next/router'

const PATHS = ['/shelf', '/search', '/follow', '/profile'] as const
const TheAppBar: React.FC = () => {
  const router = useRouter()
  const path = router.pathname

  const getPageTitle = () => {
    const PAGE_PATH_TITLE_MAP = {
      '/shelf': `本棚`,
      '/search': '本をさがす',
      '/follow': 'フォロー',
      '/profile': 'プロフィール',
    }
    return PAGE_PATH_TITLE_MAP[path as typeof PATHS[number]]
  }

  const renderAction = () => {
    const PAGE_PATH_ACTION_MAP = {
      '/shelf': <AnalyticsTemplate />,
      '/search': <></>,
      '/follow': <></>,
      '/profile': <></>,
    }
    return PAGE_PATH_ACTION_MAP[path as typeof PATHS[number]]
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={1} position='fixed' sx={{ backgroundColor: 'primary' }}>
        <Toolbar variant='dense' sx={{ textAlign: 'center' }}>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            {getPageTitle()}
          </Typography>
          {renderAction()}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default TheAppBar
