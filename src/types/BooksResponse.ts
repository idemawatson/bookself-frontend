type BooksResponse = {
  books: {
    book_id: string
    image_url: string
  }[]
  total_pages: number
}
export default BooksResponse
