import { BOOK_STATUS } from './IBookUpdateForm'

export type BooksResponse = {
  books: ClientBook[]
  meta: {
    totalPages: number
  }
}

export type ClientBook = {
  id: string
  title: string
  author?: string
  publishedAt?: string
  imageUrl?: string
  pageCount: number
  comment: string
  status: typeof BOOK_STATUS[number]
  completedAt: string
  description: string
}
