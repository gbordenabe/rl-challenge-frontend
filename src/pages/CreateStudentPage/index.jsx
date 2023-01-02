import { Button, Grid, TextField, Typography, useTheme } from '@mui/material'
import { useFormik } from 'formik'
import { useContext, useEffect, useState } from 'react'
import * as yup from 'yup'
import { AuthContext } from '../../auth/context'
import { createStudent, getRooms, getUsers } from '../../client/axiosClient'
import { MembersList } from '../../components/MembersList'
import { RoomsList } from '../../components/RoomsList'

export const CreateStudentPage = () => {
  const { token } = useContext(AuthContext)
  const { palette } = useTheme()
  const [checked, setChecked] = useState([])
  const [checkedSiblings, setCheckedSiblings] = useState([])
  const [rooms, setRooms] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    getRoomsEffect()
  }, [])

  const getRoomsEffect = async () => {
    try {
      const responses = await Promise.all([getRooms(), getUsers()])
      setRooms(responses[0].rooms)
      setUsers(responses[1].users)
    } catch (error) {
      console.log(error)
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      role: 'STUDENT_ROLE',
    },
    onSubmit: async values => {
      try {
        values.rooms = [...checked]
        values.siblings = [...checkedSiblings]
        console.log(values)
        await createStudent(values, token)
        alert('Student created')
        setChecked([])
        setCheckedSiblings([])
        formik.resetForm()
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
        Create Student
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
          <Grid container>
            <Grid item xs={6}>
              <Typography
                align="center"
                sx={{
                  marginTop: '10px',
                }}
              >
                Rooms
              </Typography>
              <RoomsList
                checked={checked}
                setChecked={setChecked}
                rooms={rooms}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography
                align="center"
                sx={{
                  marginTop: '10px',
                }}
              >
                Siblings
              </Typography>
              <MembersList
                checked={checkedSiblings}
                setChecked={setCheckedSiblings}
                users={users}
              />
            </Grid>
          </Grid>
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
            Create
          </Button>
        </form>
      </div>
    </div>
  )
}
