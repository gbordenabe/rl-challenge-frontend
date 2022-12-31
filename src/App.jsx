import { BrowserRouter } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { themeSettings } from './theme'
import { createTheme } from '@mui/material/styles'
import { useMemo } from 'react'
import { AppRouter } from './router/AppRouter'
import { AuthProvider } from './auth/context'

function App() {
  const mode = 'dark'
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
