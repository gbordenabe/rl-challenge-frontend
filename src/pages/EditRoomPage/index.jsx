import { Button, TextField, Typography, useTheme } from '@mui/material'
import { useFormik } from 'formik'
import { useContext, useEffect, useState } from 'react'
import * as yup from 'yup'
import { AuthContext } from '../../auth/context'
import {
  deleteRoom,
  deleteUser,
  getRoomById,
  getUsers,
  updateRoom,
} from '../../client/axiosClient'
import { MembersList } from '../../components/MembersList'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

export const EditRoomPage = () => {
  const { id } = useParams()
  const { token } = useContext(AuthContext)
  const { palette } = useTheme()
  const [checked, setChecked] = useState([])
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getUsersAndRoomEffect()
  }, [])

  const getUsersAndRoomEffect = async () => {
    try {
      const responses = await Promise.all([getUsers(), getRoomById(id)])
      formik.setFieldValue('number', responses[1].room.number)
      formik.setFieldValue('name', responses[1].room.name)
      setChecked(responses[1].room.members.map(member => member._id))
      setUsers(responses[0].users)
    } catch (error) {
      console.log(error)
    }
  }

  const formik = useFormik({
    initialValues: {
      number: '',
      name: '',
      members: [],
    },
    onSubmit: async values => {
      try {
        values.members = [...checked]
        await updateRoom(id, values, token)
        alert('Room updated successfully')
      } catch (error) {
        console.log(error)
        alert('Error creating room')
      }
    },
    validationSchema: yup.object({
      number: yup.number().required('Number is required'),
      name: yup.string().required('Name is required'),
    }),
  })

  const handleDelete = async () => {
    await deleteUser(id, token)
    alert('User deleted successfully')
    navigate('/home')
  }

  return (
    <div>
      {users && (
        <div>
          <Typography
            variant="h1"
            mt={3}
            align="center"
            color={palette.primary.main}
          >
            Edit Room
          </Typography>

          <div
            style={{
              margin: '20px 50px',
              backgroundColor: palette.background.alt,
              color: palette.neutral.dark,
              borderRadius: '5px',
              padding: '30px',
            }}
          >
            <form onSubmit={formik.handleSubmit}>
              <TextField
                type="number"
                label="Number"
                fullWidth
                sx={{
                  marginBottom: '10px',
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.number}
                name="number"
                id="number"
                error={Boolean(formik.errors.number)}
              />
              <TextField
                label="Name"
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                name="name"
                id="name"
                error={Boolean(formik.errors.name)}
              />
              <Typography
                align="center"
                sx={{
                  marginTop: '20px',
                }}
              >
                Members
              </Typography>
              <MembersList
                checked={checked}
                setChecked={setChecked}
                users={users}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  marginTop: '20px',
                  fontSize: '15px',
                  backgroundColor: palette.primary.main,
                  color: palette.background.default,
                }}
                fullWidth
              >
                SAVE
              </Button>
              <Button
                variant="contained"
                sx={{
                  marginTop: '20px',
                  fontSize: '15px',
                  backgroundColor: palette.primary.main,
                  color: palette.background.default,
                }}
                fullWidth
                onClick={handleDelete}
              >
                DELETE ROOM
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
