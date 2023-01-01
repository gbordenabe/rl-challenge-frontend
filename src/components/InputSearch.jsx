import { TextField } from '@mui/material'
import { useState } from 'react'

export const InputSearch = ({ rooms, setRoomsToShow }) => {
  const [search, setSearch] = useState('')
  const handleChange = ({ target }) => {
    setSearch(target.value)
    const results = rooms.filter(el => {
      const original = el.name.replace(/ /g, '').toLowerCase()
      const searched = target.value.replace(/ /g, '').toLowerCase()
      if (original.includes(searched)) {
        return el
      }
    })
    results ? setRoomsToShow(results) : setRoomsToShow(rooms)
  }

  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Search by name"
        variant="outlined"
        onChange={handleChange}
      />
    </div>
  )
}
