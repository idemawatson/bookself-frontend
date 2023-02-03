import { BOOK_STATUS } from '@/types/IBookForm'
export type BookCreateRequest = {
  book_id: string
  title: string
  author?: string
  publishedAt?: string
  pageCount: number
  description?: string
  comment?: string
  status: typeof BOOK_STATUS[number]
}
