import Router from 'next/router'
import Presenter from '@/components/uiParts/TheAppBar/presenter'

const TheAppBar: React.FC = () => {
  const handleLogout = () => {
    Router.push('/home')
  }
  return <Presenter handleLogout={handleLogout} />
}

export default TheAppBar
