import useSWR from 'swr'
import GoogleAPIServiceClient from '@/libs/APIServiceClient/GoogleAPIServiceClient'
import SearchBooksResponse from '@/types/SearchBooksResponse'
import { SearchBook } from '@/types/BooksResponse'

export const useSearchBook = (searchWord: string) => {
  const fetcher = async (url: string): Promise<SearchBook[]> => {
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
        publishedAt: volumeInfo.publishedDate || '',
        pageCount: volumeInfo.pageCount || 0,
        description: volumeInfo.description || '',
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
