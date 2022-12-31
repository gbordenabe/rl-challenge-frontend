import axios from 'axios'

export const getRooms = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_BACK_URL}api/rooms`)
  return data
}

export const createRoom = async (room, token) => {
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

export const getUsers = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_BACK_URL}api/users`)
  return data
}

export const updateUsersRooms = async (usersIds, roomId, token) => {
  const requests = usersIds.map(userId =>
    axios.put(
      `${import.meta.env.VITE_BACK_URL}api/users/${userId}`,
      { rooms: [roomId] },
      {
        headers: {
          'x-token': token,
        },
      }
    )
  )
  await Promise.all(requests)
}

export const updateRoomsMembers = async (roomsIds, userId, token) => {
  const requests = roomsIds.map(roomId =>
    axios.put(
      `${import.meta.env.VITE_BACK_URL}api/rooms/${roomId}`,
      { members: [userId] },
      {
        headers: {
          'x-token': token,
        },
      }
    )
  )
  await Promise.all(requests)
}

export const getMembers = async roomId => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BACK_URL}api/rooms/${roomId}`
  )
  return data
}
