import { ThemeProvider } from '@emotion/react'
import { FC, ReactNode } from 'react'
import { createTheme } from '@mui/material'

const MyThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const theme = createTheme({
    typography: {
      fontFamily: "'Noto Sans JP', 'sans-serif'",
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
    },
    palette: {
      primary: {
        main: '#4CAF50',
        contrastText: '#fff',
      },
      secondary: {
        main: '#00171f',
        contrastText: '#fff',
      },
    },
  })

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default MyThemeProvider
