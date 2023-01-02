import { useReducer } from 'react'
import { AuthContext } from './AuthContext'
import { authReducer } from './authReducer'
import { types } from '../types'

const init = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const token = JSON.parse(localStorage.getItem('token'))
  const mode = localStorage.getItem('mode')
  if (!mode) localStorage.setItem('mode', 'dark')

  return {
    logged: !!user,
    user,
    token,
    mode,
  }
}

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {}, init)

  const login = ({ user, token }) => {
    const action = { type: types.login, payload: { user, token } }

    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', JSON.stringify(token))

    dispatch(action)
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    const mode = localStorage.getItem('mode')
    const action = { type: types.logout, payload: mode }
    dispatch(action)
  }

  const setMode = () => {
    const prevMode = localStorage.getItem('mode')
    let newMode = ''
    if (prevMode === 'dark') {
      localStorage.setItem('mode', 'light')
      newMode = 'light'
    } else {
      localStorage.setItem('mode', 'dark')
      newMode = 'dark'
    }

    const action = { type: types.setMode, payload: newMode }
    dispatch(action)
  }

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        setMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
