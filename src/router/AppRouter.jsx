import { Grid } from '@mui/material'
import { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { AuthContext } from '../auth/context'
import { Sidebar } from '../components/Sidebar'
import { HomePage, LoginPage } from '../pages'
import { CreateRoomPage } from '../pages/CreateRoomPage'
import { CreateStudentPage } from '../pages/CreateStudentPage'
import { EditRoomPage } from '../pages/EditRoomPage'
import { EditUserPage } from '../pages/EditUserPage'
import { UserDetailsPage } from '../pages/UserDetailsPage'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const AppRouter = () => {
  const { user } = useContext(AuthContext)
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
                    {user?.role === 'TEACHER_ROLE' && (
                      <Route path="create-room" element={<CreateRoomPage />} />
                    )}
                    {user?.role === 'TEACHER_ROLE' && (
                      <Route path="edit-room/:id" element={<EditRoomPage />} />
                    )}
                    {user?.role === 'TEACHER_ROLE' && (
                      <Route
                        path="create-student"
                        element={<CreateStudentPage />}
                      />
                    )}
                    {user?.role === 'TEACHER_ROLE' && (
                      <Route path="edit-user/:id" element={<EditUserPage />} />
                    )}
                    {user?.role === 'TEACHER_ROLE' && (
                      <Route
                        path="user-details/:id"
                        element={<UserDetailsPage />}
                      />
                    )}
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
