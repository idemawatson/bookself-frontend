import useSWR from 'swr'
import GoogleAPIServiceClient from '@/libs/APIServiceClient/GoogleAPIServiceClient'
import SearchBooksResponse from '@/types/SearchBooksResponse'

export const useSearchBook = (searchWord: string) => {
  const fetcher = async (url: string): Promise<any[]> => {
    if (!searchWord) return []
    const res = await GoogleAPIServiceClient.get<SearchBooksResponse>(url)
    const items = res.data?.items || []
    return items.map((item) => {
      const volumeInfo = item.volumeInfo
      return {
        id: item.id,
        title: volumeInfo.title,
        authors: volumeInfo.authors?.join(','),
        url: volumeInfo.imageLinks?.smallThumbnail,
        publishedDate: volumeInfo.publishedDate,
        pageCount: volumeInfo.pageCount,
        description:
          volumeInfo.description && volumeInfo.description.length < 100
            ? volumeInfo.description
            : volumeInfo.description?.substring(0, 69) + '...',
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
