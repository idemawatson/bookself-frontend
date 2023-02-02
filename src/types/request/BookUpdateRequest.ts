import { BOOK_STATUS } from '@/types/IBookUpdateForm'
export type BookUpdateRequest = {
  comment?: string
  status: typeof BOOK_STATUS[number]
  completedAt: string | null
}
