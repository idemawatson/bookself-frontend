import { BOOK_STATUS } from '@/types/IBookForm'
export type BookUpdateRequest = {
  comment?: string
  status: typeof BOOK_STATUS[number]
  completedAt: string | null
}
