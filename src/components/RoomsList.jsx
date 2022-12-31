import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import { useTheme } from '@mui/system'

export const RoomsList = ({ checked, setChecked, rooms }) => {
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
        {rooms.map(room => {
          const labelId = `checkbox-list-secondary-label-${room._id}`
          return (
            <ListItem
              key={room._id}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleToggle(room._id)}
                  checked={checked.indexOf(room._id) !== -1}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemText
                  id={labelId}
                  primary={`${room.number} - ${room.name}`}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}
