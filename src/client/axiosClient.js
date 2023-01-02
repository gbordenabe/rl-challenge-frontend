import axios from 'axios'

export const getRooms = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_BACK_URL}api/rooms`)
  return data
}

export const createRoom = async (room, token) => {
  if (room.members.length === 0) delete room.members
  const { data } = await axios.post(
    `${import.meta.env.VITE_BACK_URL}api/rooms`,
    room,
    {
      headers: {
        'x-token': token,
      },
    }
  )
  return data
}

export const createStudent = async (student, token) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_BACK_URL}api/users`,
    student,
    {
      headers: {
        'x-token': token,
      },
    }
  )
  return data
}

export const updateStudent = async (id, student, token) => {
  if (student.rooms.length === 0) delete student.rooms
  if (student.siblings.length === 0) delete student.siblings
  const { data } = await axios.put(
    `${import.meta.env.VITE_BACK_URL}api/users/${id}`,
    student,
    {
      headers: {
        'x-token': token,
      },
    }
  )
  return data
}

export const getUsers = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_BACK_URL}api/users`)
  return data
}

export const updateRoom = async (roomId, values, token) => {
  if (values.members.length === 0) delete values.members
  await axios.put(
    `${import.meta.env.VITE_BACK_URL}api/rooms/${roomId}`,
    values,
    {
      headers: {
        'x-token': token,
      },
    }
  )
}

export const getMembers = async roomId => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BACK_URL}api/rooms/${roomId}`
  )
  return data
}

export const getUserById = async userId => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BACK_URL}api/users/${userId}`
  )
  return data
}

export const getRoomById = async roomId => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BACK_URL}api/rooms/${roomId}`
  )
  return data
}
