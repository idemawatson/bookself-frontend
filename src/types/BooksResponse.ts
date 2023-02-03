import { BOOK_STATUS } from './IBookForm'

export type BooksResponse = {
  books: ClientBook[]
  meta: {
    totalPages: number
  }
}

export type SearchBook = {
  id: string
  title: string
  author?: string
  publishedAt?: string
  imageUrl?: string
  pageCount: number
  description: string
}

export type ClientBook = SearchBook & {
  comment?: string
  status: typeof BOOK_STATUS[number]
  completedAt?: string
}
