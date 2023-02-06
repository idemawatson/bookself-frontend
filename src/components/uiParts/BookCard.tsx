import { SearchBook } from '@/types/BooksResponse'
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { FC, ReactElement } from 'react'

type Props = {
  book: SearchBook
  handleOnClick?: (book: SearchBook) => void
}

const CAPTION_FONT_SIZE = '12px'

const Caption = ({ children }: { children: ReactElement }) => {
  return (
    <Typography variant='subtitle1' sx={{ fontSize: CAPTION_FONT_SIZE }}>
      {children}
    </Typography>
  )
}

const BookCard: FC<Props> = ({ book, handleOnClick }) => {
  const renderCardImage = () => {
    if (book.imageUrl)
      return (
        <CardMedia component='img' image={book.imageUrl} sx={{ height: '100%', width: '100%' }} />
      )
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'gray',
          margin: 'auto',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Typography sx={{ color: 'white', fontWeight: 'bold' }}>No Image</Typography>
      </Box>
    )
  }
  const getDescription = () => {
    return book.description.length > 70 ? `${book.description.slice(0, 70)}...` : book.description
  }

  return (
    <>
      <Card elevation={0} onClick={handleOnClick ? () => handleOnClick(book) : undefined}>
        <CardActionArea>
          <Grid container>
            <Grid item xs={7}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Caption>
                  <span style={{ fontWeight: 'bold' }}>{book.title}</span>
                </Caption>
                <Caption>
                  <>
                    <span style={{ fontWeight: 'bold' }}>著者</span>: {book.author}
                  </>
                </Caption>
                <Caption>
                  <>
                    <span style={{ fontWeight: 'bold' }}>発行日</span>: {book.publishedAt}
                  </>
                </Caption>
                <Caption>
                  <>
                    <span style={{ fontWeight: 'bold' }}>ページ数</span>: {book.pageCount}
                  </>
                </Caption>
                <Caption>
                  <span>{getDescription()}</span>
                </Caption>
              </CardContent>
            </Grid>
            <Grid item xs={5} sx={{ minHeight: 200 }}>
              {renderCardImage()}
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
    </>
  )
}

export default BookCard
