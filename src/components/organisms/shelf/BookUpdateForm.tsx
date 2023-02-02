import { RhfTextField } from '@/components/uiParts/TextField'
import { IBookUpdateForm, BOOK_STATUS } from '@/types/IBookUpdateForm'
import { Grid } from '@mui/material'
import { FC, useEffect } from 'react'
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form'

import { RhfDatePicker } from '@/components/uiParts/DatePicker'
import { RhfSelectField } from '@/components/uiParts/SelectField'

type Props = {
  control: Control<IBookUpdateForm, any>
  watch: UseFormWatch<IBookUpdateForm>
  setValue: UseFormSetValue<IBookUpdateForm>
}

const STATUS_SELECTIONS = [
  { text: '読みたい', value: 0 },
  { text: '積読', value: 1 },
  { text: '読んでる', value: 2 },
  { text: '読んだ！', value: 3 },
]

const BookUpdateForm: FC<Props> = ({ control, watch, setValue }) => {
  const isCompleted = watch('status', BOOK_STATUS[0]) === BOOK_STATUS[3]
  useEffect(() => {
    if (!isCompleted) {
      setValue('completedAt', undefined)
    }
  }, [isCompleted])
  return (
    <>
      <Grid container>
        <Grid xs={6} item sx={{ pr: 1 }}>
          <RhfSelectField
            name='status'
            control={control}
            label='今どんな感じ？'
            selectPropsList={STATUS_SELECTIONS}
          />
        </Grid>
        <Grid xs={6} item>
          {isCompleted && (
            <RhfDatePicker
              label='読んだ日付'
              name='completedAt'
              disableFuture
              control={control}
            ></RhfDatePicker>
          )}
        </Grid>
        <Grid xs={12} sx={{ my: 1 }} item>
          <RhfTextField
            label='メモ'
            name='comment'
            type='number'
            multiline
            rows={10}
            control={control}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default BookUpdateForm
