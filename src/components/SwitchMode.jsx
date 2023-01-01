import { Switch } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../auth/context'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

export const SwitchMode = () => {
  const [isChecked, setIsChecked] = useState(true)
  const { mode, setMode } = useContext(AuthContext)

  useEffect(() => {
    mode === 'dark' ? setIsChecked(true) : setIsChecked(false)
  }, [])

  const handleChange = () => {
    setIsChecked(!isChecked)
    setMode()
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
      }}
    >
      {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
      <Switch
        aria-label="Size switch demo"
        checked={isChecked}
        onChange={handleChange}
      />
    </div>
  )
}
