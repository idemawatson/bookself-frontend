import useSWRInfinite from 'swr/infinite'
import getBackendAPIServiceClient from '@/libs/APIServiceClient/BackendAPIServiceClient'
import { useToken } from './staticSWR/useAccessToken'
import { ClientBook } from '@/types/BooksResponse'

export const useBooks = (status: number) => {
  const { token } = useToken()
  const getKey = (pageIndex: number, previousPageData: ClientBook[]) => {
    if (previousPageData && !previousPageData.length) return null
    return token ? `books?page=${pageIndex + 1}&status=${status}` : null
  }
  const fetcher = async (url: string): Promise<ClientBook[]> => {
    const client = getBackendAPIServiceClient(token)
    const response = await client.get(url)
    return response.data as ClientBook[]
  }
  const { data, mutate, size, setSize } = useSWRInfinite(getKey, fetcher, {
    suspense: true,
    initialSize: 1,
    persistSize: true,
    revalidateFirstPage: false,
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateIfStale: false,
  })

  return {
    data,
    mutate,
    size,
    setSize,
  }
}
