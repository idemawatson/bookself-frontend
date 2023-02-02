import dayjs from '@/libs/importDayjs'
import * as yup from 'yup'

export const BOOK_STATUS = [0, 1, 2, 3] as const

type BookUpdateModel = {
  comment?: string
  status: typeof BOOK_STATUS[number]
  completedAt?: Date
}

export const schema: yup.SchemaOf<BookUpdateModel> = yup.object().shape({
  comment: yup.string().max(1000, '1000文字以下で入力してください'),
  status: yup.mixed().oneOf(BOOK_STATUS.concat([])).required('ステータスを指定してください'),
  completedAt: yup.date().max(dayjs().add(1, 'd'), '不正な日付です'),
})

export type IBookUpdateForm = yup.InferType<typeof schema>
