import { useToken } from '@/hooks/useAccessToken'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import { FC, ReactNode, useEffect } from 'react'

const AuthRequired: FC<{ children: ReactNode }> = ({ children }) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  const { token, setToken } = useToken()

  useEffect(() => {
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently()
        setToken(accessToken)
      } catch (e) {
        console.error(e)
      }
    }
    if (isAuthenticated && !token) getToken()
  }, [])

  return <>{children}</>
}

export default (Page: FC) =>
  withAuthenticationRequired(() => (
    <AuthRequired>
      <Page />
    </AuthRequired>
  ))
