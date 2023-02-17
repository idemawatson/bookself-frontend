import { styled } from '@mui/material'
import { grey } from '@mui/material/colors'

const TheOffset = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
  backgroundColor: grey[200],
}))

export default TheOffset
