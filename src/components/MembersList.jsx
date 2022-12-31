import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import { useTheme } from '@mui/system'

export const MembersList = ({ checked, setChecked, users }) => {
  const { palette } = useTheme()
  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]
    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }
    setChecked(newChecked)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <List
        dense
        sx={{
          width: '100%',
          maxWidth: 300,
          maxHeight: 100,
          overflow: 'auto',
          bgcolor: palette.background.default,
          mt: 2,
          color: palette.primary.main,
          borderRadius: 2,
        }}
      >
        {users.map(value => {
          const labelId = `checkbox-list-secondary-label-${value.uid}`
          return (
            <ListItem
              key={value.uid}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleToggle(value.uid)}
                  checked={checked.indexOf(value.uid) !== -1}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemText id={labelId} primary={`${value.name}`} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}
