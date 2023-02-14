import useSWR from 'swr'
import getBackendAPIServiceClient from '@/libs/APIServiceClient/BackendAPIServiceClient'
import { useToken } from '@/hooks/staticSWR/useAccessToken'
import { ClientUser } from '@/types/UserResponse'

export const useSearchUser = (searchWord: string) => {
  const { token } = useToken()
  const fetcher = async (url: string): Promise<ClientUser[]> => {
    if (!searchWord) return []
    const res = await getBackendAPIServiceClient(token).get<ClientUser[]>(url)
    return res.data
  }

  const { data, mutate } = useSWR(`users?q=${searchWord}`, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  })

  return {
    data,
    mutate,
  }
}
