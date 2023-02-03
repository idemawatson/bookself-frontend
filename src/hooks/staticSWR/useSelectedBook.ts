import { ClientBook } from '@/types/BooksResponse'
import useSWR from 'swr'

const useSelectedBookSWR = (
  initialData?: ClientBook,
): [ClientBook, (state?: ClientBook) => void] => {
  const { data: state, mutate: setState } = useSWR('selectedBook', null, {
    fallbackData: initialData,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
  return [state as ClientBook, setState]
}

export const useSelectedBook = () => {
  const [selectedBook, setSelectedBook] = useSelectedBookSWR(undefined)

  return {
    selectedBook,
    setSelectedBook,
  }
}
