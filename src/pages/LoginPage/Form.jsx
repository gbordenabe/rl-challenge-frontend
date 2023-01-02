import { useContext } from 'react'
import { Box, Button, TextField, useTheme } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../auth/context'

const loginSchema = yup.object().shape({
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required'),
})

const initialValuesLogin = {
  email: '',
  password: '',
}

export const Form = () => {
  const { palette } = useTheme()
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleFormSubmit = async (values, onSubmitProps) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACK_URL}api/auth/login`,
      values
    )
    if (data) {
      login(data)
      onSubmitProps.resetForm()
      navigate('/home')
    }
  }

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesLogin}
      validationSchema={loginSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box display="grid" gap="30px">
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
          </Box>
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: '2rem 0',
                p: '1rem',
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                '&:hover': { color: palette.primary.main },
              }}
            >
              LOGIN
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  )
}
