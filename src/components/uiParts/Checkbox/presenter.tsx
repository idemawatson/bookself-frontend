import {
  FormControl,
  FormHelperText,
  styled,
  Checkbox as MUICheckbox,
  // eslint-disable-next-line
  CheckboxProps as MUICheckboxProps,
  FormControlLabel,
} from '@mui/material'
import type { ChangeEvent, ReactNode } from 'react'

export type CheckboxProps = {
  error?: string
  className?: string
  placeholder?: string
  label: string
}

const StyledFormControl = styled(FormControl)({
  width: '100%',
})

export const Checkbox = (
  props: CheckboxProps & {
    inputRef?: MUICheckboxProps['inputRef']
    value: string
    onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void
  },
) => {
  return (
    <>
      <StyledFormControl>
        <FormControlLabel
          control={
            <MUICheckbox
              placeholder={props.placeholder}
              className={props.className}
              inputRef={props.inputRef}
              value={props.value}
              onChange={props.onChange}
            />
          }
          label={props.label}
        ></FormControlLabel>
      </StyledFormControl>
      {!!props.error && <FormHelperText error>{props.error}</FormHelperText>}
    </>
  )
}
