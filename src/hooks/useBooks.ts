import useSWR from 'swr'
import getBackendAPIServiceClient from '@/libs/APIServiceClient/BackendAPIServiceClient'
import { useToken } from './useAccessToken'
import { BooksResponse } from '@/types/BooksResponse'

export const useBooks = (page: number) => {
  const { token } = useToken()
  const fetcher = async (url: string): Promise<BooksResponse> => {
    const client = getBackendAPIServiceClient(token)
    const response = await client.get(url)
    return response.data as BooksResponse
  }
  const { data, mutate } = useSWR(token ? `books?page=${page}` : null, fetcher, {
    suspense: true,
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateIfStale: false,
  })

  return {
    data,
    mutate,
  }
}
