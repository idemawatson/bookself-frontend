import { RhfDatePicker } from '@/components/uiParts/DatePicker'
import { RhfSelectField } from '@/components/uiParts/SelectField'
import { RhfTextField } from '@/components/uiParts/TextField'
import { BOOK_STATUS, IBookUpdateForm } from '@/types/IBookForm'
import { Grid } from '@mui/material'
import { FC, useEffect } from 'react'
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { STATUS_SELECTIONS } from '../search/BookAddConfirmationDialog'

type Props = {
  control: Control<IBookUpdateForm, any>
  watch: UseFormWatch<IBookUpdateForm>
  setValue: UseFormSetValue<IBookUpdateForm>
}

const BookUpdateForm: FC<Props> = ({ control, watch, setValue }) => {
  const isCompleted = watch('status', BOOK_STATUS[0]) === BOOK_STATUS[3]
  useEffect(() => {
    if (!isCompleted) {
      setValue('completedAt', undefined)
    }
  }, [isCompleted])
  return (
    <>
      <Grid container columnSpacing={1}>
        <Grid item xs={6}>
          <RhfSelectField
            name='status'
            control={control}
            label='今どんな感じ？'
            selectPropsList={STATUS_SELECTIONS}
          />
        </Grid>
        <Grid item xs={6}>
          {isCompleted && (
            <RhfDatePicker label='読んだ日付' name='completedAt' disableFuture control={control} />
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
