import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { LocalizationProvider, MobileDatePicker, MobileDatePickerProps } from '@mui/x-date-pickers'
import { TextField } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from 'dayjs'

export type RhfDatePickerProps<T extends FieldValues> = Omit<
  MobileDatePickerProps<Dayjs, Dayjs>,
  'onChange' | 'renderInput' | 'value'
> &
  UseControllerProps<T>

/**
 * react-hook-formラッパー
 */
export const RhfDatePicker = <T extends FieldValues>(props: RhfDatePickerProps<T>) => {
  const { name, control, label, maxDate, minDate, disableFuture, disabled } = props
  const { field, fieldState } = useController<T>({ name, control })

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
        label={label}
        inputFormat='YYYY/MM/DD'
        toolbarTitle='日付選択'
        toolbarFormat='YYYY/MM/DD'
        maxDate={maxDate}
        minDate={minDate}
        disableFuture={disableFuture}
        disabled={disabled}
        closeOnSelect={true}
        renderInput={(params) => (
          <TextField
            {...params}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
        {...field}
      />
    </LocalizationProvider>
  )
}
