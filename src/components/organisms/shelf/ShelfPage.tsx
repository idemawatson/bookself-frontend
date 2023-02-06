import BaseCircularProgress from '@/components/uiParts/BaseCircularProgress'
import { useIntersection } from '@/hooks/staticSWR/useIntersection'
import { useSelectedBook } from '@/hooks/staticSWR/useSelectedBook'
import { useShelfFilterTab } from '@/hooks/staticSWR/useShelfFilterTab'
import { useBooks } from '@/hooks/useBooks'
import { ClientBook } from '@/types/BooksResponse'
import { Alert, AlertTitle, Box } from '@mui/material'
import { FC, useEffect, useRef, useState } from 'react'
import BookUpdateDrawer from './BookUpdateDrawer'
import ShelfStage from './ShelfStage'

type Props = {}
const PER_PAGE_LIMIT = 12

const ShelfPage: FC<Props> = () => {
  const ref = useRef<HTMLDivElement>(null) as React.MutableRefObject<HTMLDivElement>
  const intersection = useIntersection(ref)

  const { shelfFilterTab: tab } = useShelfFilterTab()
  const [drawer, setDrawer] = useState(false)
  const { setSelectedBook } = useSelectedBook()
  const { data, mutate, size, setSize } = useBooks(tab - 1)

  const isEmpty = data && data[0]?.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PER_PAGE_LIMIT)

  useEffect(() => {
    // トリガーが表示されたらデータを取得
    if (intersection && !isReachingEnd) {
      getBooks()
    }
  }, [intersection, isReachingEnd])

  const open = (book: ClientBook) => {
    setSelectedBook({ ...book })
    setDrawer(true)
  }
  if (!data) return <></>

  // 次のデータの取得
  const getBooks = async () => {
    setSize(size + 1)
  }

  const books = data.flat()

  const PER_ROW = 3
  const rowSize = Math.floor(
    books.length % PER_ROW === 0 ? books.length / PER_ROW : books.length / PER_ROW + 1,
  )

  return (
    <>
      {[...Array(rowSize)].map((_, i) => (
        <ShelfStage
          onClickBook={open}
          books={books.slice(i * PER_ROW, (i + 1) * PER_ROW)}
          key={i}
        />
      ))}
      <Box ref={ref} sx={{ position: 'relative' }}>
        {!isReachingEnd && <BaseCircularProgress indicator_size={40} sx={{ mt: 4 }} />}
        {isEmpty && (
          <Alert severity='info' sx={{ mt: 2 }}>
            <AlertTitle>Info</AlertTitle>
            <div>書籍が登録されていません。</div>
            <div>追加してみましょう！</div>
          </Alert>
        )}
      </Box>

      <BookUpdateDrawer open={drawer} setOpen={setDrawer} mutate={mutate}></BookUpdateDrawer>
    </>
  )
}

export default ShelfPage
