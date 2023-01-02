import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { SwitchMode } from '../../components/SwitchMode'
import { Form } from './Form'

export const LoginPage = () => {
  const theme = useTheme()
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)')
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Courses App
        </Typography>
        <SwitchMode />
      </Box>

      <Box
        width={isNonMobileScreens ? '50%' : '93%'}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: '1.5rem' }}>
          Wellcome to my Courses App, it's a challenge for Rather Labs!
        </Typography>
        <Form />
      </Box>
    </Box>
  )
}
