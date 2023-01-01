import { BrowserRouter } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { themeSettings } from './theme'
import { createTheme } from '@mui/material/styles'
import { useContext, useMemo } from 'react'
import { AppRouter } from './router/AppRouter'
import { AuthContext, AuthProvider } from './auth/context'

function App() {
  const { mode } = useContext(AuthContext)
  //const mode = 'dark'
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
