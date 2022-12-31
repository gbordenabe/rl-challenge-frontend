import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { RoomDialog } from '../../components'
import { getRooms } from '../../client/axiosClient'

export const HomePage = () => {
  const { palette } = useTheme()
  const [rooms, setRooms] = useState([])
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)

  useEffect(() => {
    fetchRooms()
  }, [])

  const fetchRooms = async () => {
    const { rooms } = await getRooms()
    setRooms(rooms)
  }

  const showDialog = room => {
    setIsOpenDialog(true)
    setSelectedRoom(room)
  }

  return (
    <div>
      <Typography
        variant="h1"
        mt={3}
        align="center"
        color={palette.primary.main}
      >
        Room List
      </Typography>
      {rooms.length !== 0 ? (
        <List
          sx={{
            margin: '5%',
            backgroundColor: palette.background.alt,
            color: palette.neutral.dark,
            borderRadius: '5px',
          }}
        >
          {rooms.map(room => (
            <ListItem
              key={room._id}
              disablePadding
              onClick={() => showDialog(room)}
              sx={{ padding: '5px 30px' }}
            >
              <ListItemButton>
                <ListItemText
                  primary={`${room.number} - Name: ${room.name}`}
                  secondary={`${room.members.length} ${
                    room.members.length === 1 ? 'Student' : 'Students'
                  }`}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="h5" align="center" sx={{ marginTop: '50px' }}>
          There is not rooms
        </Typography>
      )}
      {selectedRoom && (
        <RoomDialog
          isOpen={isOpenDialog}
          setIsOpenDialog={setIsOpenDialog}
          room={selectedRoom}
        />
      )}
    </div>
  )
}
