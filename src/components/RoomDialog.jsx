import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Chip from '@mui/material/Chip'
import { Navigate, useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/system'
import { Typography } from '@mui/material'
import { useContext } from 'react'
import { AuthContext } from '../auth/context'

export const RoomDialog = ({ isOpen, setIsOpenDialog, room }) => {
  const { palette } = useTheme()
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleClose = () => {
    setIsOpenDialog(false)
  }

  const handleClickEdit = () => {
    navigate(`/edit-room/${room._id}`)
  }

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={{ backgroundColor: palette.neutral.light }}>
          <DialogTitle
            id="alert-dialog-title"
            sx={{ color: palette.neutral.dark }}
          >
            {`${room.number} - ${room.name}`}
          </DialogTitle>
          <DialogContent>
            {room.members.length > 0
              ? room.members.map(student => (
                  <Chip
                    key={student._id}
                    label={`${student.name}`}
                    sx={{
                      margin: '5px',
                      fontSize: '15px',
                      color: palette.neutral.light,
                      backgroundColor: palette.neutral.main,
                    }}
                    onClick={() => {
                      user.role === 'TEACHER_ROLE' &&
                        navigate(`/user-details/${student._id}`)
                    }}
                  />
                ))
              : 'This room is empty'}
          </DialogContent>
          {user.role === 'TEACHER_ROLE' && (
            <DialogActions>
              <Button
                variant="contained"
                onClick={handleClickEdit}
                sx={{
                  backgroundColor: palette.primary.main,
                  color: palette.primary.light,
                }}
              >
                Edit room
              </Button>
            </DialogActions>
          )}
        </div>
      </Dialog>
    </div>
  )
}
