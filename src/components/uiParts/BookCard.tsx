import { ClientBook } from '@/types/BooksResponse'
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { FC } from 'react'

type Props = ClientBook & {
  handleOnClick: () => void
}
const BookCard: FC<Props> = (props) => {
  const cardImage = () => {
    if (props.imageUrl)
      return <CardMedia component='img' image={props.imageUrl} sx={{ height: '100%' }} />
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
  const captionFontSize = '12px'
  return (
    <>
      <Card elevation={0} onClick={props.handleOnClick}>
        <CardActionArea>
          <Grid container>
            <Grid item xs={7}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography sx={{ fontWeight: 'bold' }}>{props.title}</Typography>
                <Typography variant='subtitle1' sx={{ fontSize: captionFontSize }}>
                  <span style={{ fontWeight: 'bold' }}>著者</span>: {props.author}
                </Typography>
                <Typography variant='subtitle1' sx={{ fontSize: captionFontSize }}>
                  <span style={{ fontWeight: 'bold' }}>発行日</span>: {props.publishedDate}
                </Typography>
                <Typography variant='subtitle1' sx={{ fontSize: captionFontSize }}>
                  <span style={{ fontWeight: 'bold' }}>ページ数</span>: {props.pageCount}
                </Typography>
                <div style={{ fontSize: captionFontSize }}>{props.description}</div>
              </CardContent>
            </Grid>
            <Grid item xs={5} sx={{ minHeight: 200 }}>
              {cardImage()}
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
    </>
  )
}

export default BookCard
