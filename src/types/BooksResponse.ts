export type BooksResponse = {
  books: {
    book_id: string
    title: string
    authors?: string
    published_date?: string
    image_url?: string
    page_count: number
    description: string
  }[]
  total_pages: number
}

export type ClientBook = {
  id: string
  title: string
  author: string
  publishedDate: string
  imageUrl: string
  pageCount: number
  description: string
}
