import { Button, TextField, Typography, useTheme } from '@mui/material'
import { useFormik } from 'formik'
import { useContext, useEffect, useState } from 'react'
import * as yup from 'yup'
import { AuthContext } from '../../auth/context'
import { createRoom, getUsers } from '../../client/axiosClient'
import { MembersList } from '../../components/MembersList'

export const CreateRoomPage = () => {
  const { token } = useContext(AuthContext)
  const { palette } = useTheme()
  const [checked, setChecked] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsersEffect()
  }, [])

  const getUsersEffect = async () => {
    try {
      const { users } = await getUsers()
      setUsers(users)
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
        await createRoom(values, token)
        alert('Room created')
        setChecked([])
        formik.resetForm()
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

  return (
    <div>
      <Typography
        variant="h1"
        mt={3}
        align="center"
        color={palette.primary.main}
      >
        Create Room
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
            Create
          </Button>
        </form>
      </div>
    </div>
  )
}
