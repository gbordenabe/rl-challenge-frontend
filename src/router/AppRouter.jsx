import { Grid } from '@mui/material'
import { Route, Routes, Navigate } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { HomePage, LoginPage } from '../pages'
import { CreateRoomPage } from '../pages/CreateRoomPage'
import { CreateStudentPage } from '../pages/CreateStudentPage'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path="login/*"
          element={
            <PublicRoute>
              <Routes>
                <Route path="/*" element={<LoginPage />} />
              </Routes>
            </PublicRoute>
          }
        />

        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Grid container>
                <Grid item xs={2}>
                  <Sidebar />
                </Grid>
                <Grid item xs={10}>
                  <Routes>
                    <Route path="home" element={<HomePage />} />
                    <Route path="create-room" element={<CreateRoomPage />} />
                    <Route
                      path="create-student"
                      element={<CreateStudentPage />}
                    />
                    {/*<Route path="student-page/:id" element={<StudentPage />} />
                    <Route path="edit-room/:id" element={<EditRoomPage />} /> */}
                    <Route path="/" element={<Navigate to="/home" />} />
                  </Routes>
                </Grid>
              </Grid>
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  )
}
