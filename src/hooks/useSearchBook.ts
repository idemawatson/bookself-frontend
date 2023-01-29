import useSWR from 'swr'
import GoogleAPIServiceClient from '@/libs/APIServiceClient/GoogleAPIServiceClient'
import SearchBooksResponse from '@/types/SearchBooksResponse'
import { ClientBook } from '@/types/BooksResponse'

const getDescription = (description?: string) => {
  if (!description) return ''
  return description.length < 100 ? description : description?.substring(0, 69) + '...'
}

export const useSearchBook = (searchWord: string) => {
  const fetcher = async (url: string): Promise<ClientBook[]> => {
    if (!searchWord) return []
    const res = await GoogleAPIServiceClient.get<SearchBooksResponse>(url)
    const items = res.data?.items || []
    return items.map((item) => {
      const volumeInfo = item.volumeInfo
      return {
        id: item.id,
        title: volumeInfo.title || '',
        author: volumeInfo.authors?.join(',') || '',
        imageUrl: volumeInfo.imageLinks?.smallThumbnail || '',
        publishedDate: volumeInfo.publishedDate || '',
        pageCount: volumeInfo.pageCount || 0,
        description: getDescription(volumeInfo.description),
      }
    })
  }

  const { data, mutate } = useSWR(`books/v1/volumes?q=${searchWord}`, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  })

  return {
    data,
    mutate,
  }
}
