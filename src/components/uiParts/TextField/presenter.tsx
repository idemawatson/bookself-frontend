import {
  FormControl,
  FormHelperText,
  styled,
  TextField as MUITextField,
  // eslint-disable-next-line
  TextFieldProps as MUITextFieldProps,
} from '@mui/material'
import type { ChangeEventHandler, FocusEventHandler, ReactNode } from 'react'

export type TextFieldProps = {
  error?: string
  className?: string
  placeholder?: string
  label?: string
  type?: string
  multiline?: boolean
  rows?: number
  endAdornment?: ReactNode
}

const StyledFormControl = styled(FormControl)({
  width: '100%',
})

export const TextField = (
  props: TextFieldProps & {
    inputRef?: MUITextFieldProps['inputRef']
    value: string
    onChange: ChangeEventHandler<HTMLTextAreaElement>
    onBlur?: FocusEventHandler<HTMLTextAreaElement>
  },
) => {
  return (
    <>
      <StyledFormControl>
        <MUITextField
          placeholder={props.placeholder}
          label={props.label}
          className={props.className}
          inputRef={props.inputRef}
          value={props.value}
          type={props.type}
          multiline={props.multiline}
          rows={props.rows}
          onChange={props.onChange}
          onBlur={props.onBlur}
          InputProps={{
            endAdornment: props.endAdornment,
          }}
        />
      </StyledFormControl>
      {!!props.error && <FormHelperText error>{props.error}</FormHelperText>}
    </>
  )
}
