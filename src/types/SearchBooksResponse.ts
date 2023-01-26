type SearchBooksResponse = {
  items: {
    id: string
    volumeInfo: {
      title?: string
      authors?: string[]
      imageLinks?: {
        smallThumbnail: string
      }
      publishedDate?: string
      pageCount?: number
      description?: string
    }
  }[]
}

export default SearchBooksResponse
