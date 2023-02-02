import {
  DeepMap,
  FieldError,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form'

import { Checkbox, CheckboxProps } from '@/components/uiParts/Checkbox/presenter'

export type RhfCheckboxProps<T extends FieldValues> = CheckboxProps & UseControllerProps<T>

/**
 * react-hook-formラッパー
 */
export const RhfCheckbox = <T extends FieldValues>(props: RhfCheckboxProps<T>) => {
  const { name, control, placeholder, label, className } = props
  const {
    field: { ref, ...rest },
    formState: { errors },
  } = useController<T>({ name, control })

  return (
    <Checkbox
      inputRef={ref}
      className={className}
      placeholder={placeholder}
      label={label}
      {...rest}
      error={errors[name] && `${(errors[name] as DeepMap<FieldValues, FieldError>).message}`}
    />
  )
}
