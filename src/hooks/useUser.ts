import getBackendAPIServiceClient from '@/libs/APIServiceClient/BackendAPIServiceClient'
import { useToken } from './staticSWR/useAccessToken'
import { ClientUser } from '@/types/UserResponse'
import useSWR from 'swr'

export const useUser = (user_id?: string) => {
  const { token } = useToken()
  const fetcher = async (url: string): Promise<ClientUser> => {
    const client = getBackendAPIServiceClient(token)
    const response = await client.get(url)
    return response.data as ClientUser
  }
  const { data, mutate } = useSWR(token ? `users/${user_id || -1}` : null, fetcher, {
    suspense: true,
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateIfStale: false,
  })

  return {
    data,
    mutate,
  }
}
