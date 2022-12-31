import { useReducer } from 'react'
import { AuthContext } from './AuthContext'
import { authReducer } from './authReducer'
import { types } from '../types'

const init = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const token = JSON.parse(localStorage.getItem('token'))
  const mode = JSON.parse(localStorage.getItem('dark'))

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
    const action = { type: types.logout }
    dispatch(action)
  }

  const setMode = (mode = 'light') => {
    localStorage.getItem('mode')
    mode === 'light'
      ? localStorage.setItem('mode', 'dark')
      : localStorage.setItem('mode', 'light')
    const action = { type: types.setMode }
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
