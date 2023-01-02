import { Button, Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/system'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserById } from '../../client/axiosClient'

export const UserDetailsPage = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const { palette } = useTheme()
  const navigate = useNavigate()

  useEffect(() => {
    getUserEffect()
  }, [id])

  const getUserEffect = async () => {
    setUser(await getUserById(id))
  }

  const handleClickEdit = () => {
    navigate(`/edit-user/${id}`)
  }

  const styles = {
    item: {
      marginRight: 1,
    },
    data: {},
    constainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
  }
  return (
    <div>
      {user && (
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <Typography variant="h1" mt={3} color={palette.primary.main}>
              {`${user.name} Details`}
            </Typography>
          </div>
          <div style={{ justifyContent: 'center', marginTop: 30 }}>
            <div style={styles.constainer}>
              <Typography variant="h3" sx={styles.item}>
                Name:
              </Typography>
              <Typography variant="h3" sx={styles.data}>
                {user.name}
              </Typography>
            </div>
            <div style={styles.constainer}>
              <Typography variant="h3" sx={styles.item}>
                Email:
              </Typography>
              <Typography variant="h3" sx={styles.data}>
                {user.email}
              </Typography>
            </div>
            <div style={styles.constainer}>
              <Typography variant="h3" sx={styles.item}>
                Role:
              </Typography>
              <Typography variant="h3" sx={styles.data}>
                {user.role === 'TEACHER_ROLE' ? 'Teacher' : 'Student'}
              </Typography>
            </div>
            <div style={styles.constainer}>
              <Typography variant="h3" sx={styles.item}>
                Rooms:
              </Typography>
              <Typography variant="h3" sx={styles.data}>
                {user.rooms.length !== 0
                  ? user.rooms.map(room => room.name).join(', ')
                  : 'There is not rooms'}
              </Typography>
            </div>
            <div style={styles.constainer}>
              <Typography variant="h3" sx={styles.item}>
                Siblings:
              </Typography>
              <Typography variant="h3" sx={styles.data}>
                {user.siblings.length !== 0
                  ? user.siblings.map(user => user.name).join(', ')
                  : 'There is not siblings'}
              </Typography>
            </div>
            {
              <div style={styles.constainer}>
                <Button
                  variant="contained"
                  onClick={handleClickEdit}
                  sx={{
                    backgroundColor: palette.primary.main,
                    color: palette.primary.light,
                    marginTop: 5,
                    alignSelf: 'center',
                  }}
                >
                  Edit user
                </Button>
              </div>
            }
          </div>
        </div>
      )}
    </div>
  )
}
