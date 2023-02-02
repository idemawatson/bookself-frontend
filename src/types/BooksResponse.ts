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
  description: string
}
