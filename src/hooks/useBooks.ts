import useSWR from 'swr'
import getBackendAPIServiceClient from '@/libs/APIServiceClient/BackendAPIServiceClient'
import { useToken } from './useAccessToken'

export const useBooks = () => {
  const { token } = useToken()
  const fetcher = async (url: string): Promise<any> => {
    const client = getBackendAPIServiceClient(token)
    const response = await client.get(url)
    return response.data
  }
  const { data, mutate } = useSWR(token ? `books` : null, fetcher, {
    suspense: true,
    revalidateOnFocus: false,
    revalidateOnMount: true,
  })

  return {
    data,
    mutate,
  }
}
