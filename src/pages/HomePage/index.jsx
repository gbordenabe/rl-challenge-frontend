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
import { InputSearch } from '../../components/InputSearch'

export const HomePage = () => {
  const { palette } = useTheme()
  const [rooms, setRooms] = useState([])
  const [roomsToShow, setRoomsToShow] = useState([])
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)

  useEffect(() => {
    fetchRooms()
  }, [])

  const fetchRooms = async () => {
    const { rooms } = await getRooms()
    setRoomsToShow(rooms)
    setRooms(rooms)
  }

  const showDialog = room => {
    setIsOpenDialog(true)
    setSelectedRoom(room)
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}
      >
        <Typography variant="h1" mt={3} mr={5} color={palette.primary.main}>
          Room List
        </Typography>
        <InputSearch rooms={rooms} setRoomsToShow={setRoomsToShow} />
      </div>
      {roomsToShow.length !== 0 ? (
        <List
          sx={{
            margin: '5%',
            backgroundColor: palette.background.alt,
            color: palette.neutral.dark,
            borderRadius: '5px',
            maxHeight: '450px',
            overflow: 'auto',
          }}
        >
          {roomsToShow.map(room => (
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
