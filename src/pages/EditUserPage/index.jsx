import { Button, TextField, Typography, useTheme } from '@mui/material'
import { useFormik } from 'formik'
import { useContext, useEffect, useState } from 'react'
import * as yup from 'yup'
import { AuthContext } from '../../auth/context'
import { getUserById, getRooms, updateStudent } from '../../client/axiosClient'
import { RoomsList } from '../../components/RoomsList'
import { useParams } from 'react-router-dom'

export const EditUserPage = () => {
  const { token } = useContext(AuthContext)
  const { palette } = useTheme()
  const [checked, setChecked] = useState([])
  const [rooms, setRooms] = useState([])
  const { id } = useParams()

  useEffect(() => {
    getRoomsEffect()
  }, [])

  const getRoomsEffect = async () => {
    try {
      const responses = await Promise.all([getRooms(), getUserById(id)])
      formik.setFieldValue('name', responses[1].name)
      formik.setFieldValue('email', responses[1].email)
      formik.setFieldValue('role', responses[1].role)
      setChecked(responses[1].rooms.map(room => room._id))
      setRooms(responses[0].rooms)
    } catch (error) {
      console.log(error)
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '123456',
      role: '',
    },
    onSubmit: async values => {
      try {
        values.rooms = [...checked]
        values.siblings = []
        await updateStudent(id, values, token)
        console.log(values)
        alert('Student updated successfully')
      } catch (error) {
        console.log(error)
        alert('Error creating student')
      }
    },
    validationSchema: yup.object({
      name: yup.string().required('First Name is required'),
      email: yup.string().required('Last Name is required'),
      password: yup.string().min(6).required('Temporal password is required'),
    }),
  })

  return (
    <div>
      <Typography
        variant="h1"
        mt={3}
        align="center"
        color={palette.primary.main}
      >
        Update Student
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
            label="Name"
            fullWidth
            sx={{
              marginBottom: '10px',
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            name="name"
            id="name"
            error={Boolean(formik.errors.name)}
          />
          <TextField
            label="Email"
            fullWidth
            sx={{
              marginBottom: '10px',
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            name="email"
            id="email"
            error={Boolean(formik.errors.email)}
          />
          <TextField
            label="Temporal Password"
            fullWidth
            sx={{
              marginBottom: '10px',
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            name="password"
            id="password"
            error={Boolean(formik.errors.password)}
          />
          <Typography
            align="center"
            sx={{
              marginTop: '10px',
            }}
          >
            Rooms
          </Typography>
          <RoomsList checked={checked} setChecked={setChecked} rooms={rooms} />
          <Button
            type="submit"
            variant="contained"
            sx={{
              marginTop: '20px',
              fontSize: '15px',
              backgroundColor: palette.primary.main,
              color: palette.background.dafault,
            }}
            fullWidth
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  )
}
