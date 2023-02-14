import { Button } from '@mui/material'
import { FC, ReactNode } from 'react'

type Props = {
  onClick?: () => void
  submit?: boolean
  color: 'inherit' | 'primary' | 'secondary' | 'error' | 'success' | 'info' | 'warning'
  disabled?: boolean
  size?: 'large' | 'medium' | 'small'
  sx?: any
  className?: string
  children: ReactNode
}

export const BaseButton: FC<Props> = ({
  onClick,
  submit = false,
  color,
  disabled,
  size,
  sx,
  className,
  children,
}) => {
  return (
    <Button
      type={submit ? 'submit' : undefined}
      variant='contained'
      disableElevation
      color={color}
      disabled={disabled}
      size={size}
      sx={sx}
      className={className}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}
