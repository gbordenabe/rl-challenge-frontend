import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import AddBusinessIcon from '@mui/icons-material/AddBusiness'
import AddReactionIcon from '@mui/icons-material/AddReaction'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../auth/context'
import { SwitchMode } from './SwitchMode'

export const Sidebar = () => {
  const { palette } = useTheme()
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const sections = [
    {
      title: 'Room List',
      url: '/home',
      icon: <FormatListBulletedIcon style={{ color: palette.primary.main }} />,
    },
    {
      title: 'Create Room',
      url: '/create-room',
      icon: <AddBusinessIcon style={{ color: palette.primary.main }} />,
    },
    {
      title: 'Create student',
      url: '/create-student',
      icon: <AddReactionIcon style={{ color: palette.primary.main }} />,
    },
    {
      title: 'Logout',
      url: '/login',
      icon: <LogoutIcon style={{ color: palette.primary.main }} />,
    },
  ]

  return (
    <div
      style={{
        height: '100vh',
        overflow: 'auto',
        backgroundColor: palette.background.alt,
        color: palette.primary.main,
      }}
    >
      <SwitchMode />
      <List>
        {sections.map(section => (
          <ListItem
            key={section.title}
            disablePadding
            onClick={() => {
              if (section.title === 'Logout') logout()
              navigate(section.url)
            }}
          >
            <ListItemButton>
              <ListItemIcon>{section.icon}</ListItemIcon>
              <ListItemText primary={section.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )
}
