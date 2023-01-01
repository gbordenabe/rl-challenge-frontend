import { types } from '../types'

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      return {
        ...state,
        logged: true,
        user: action.payload.user,
        token: action.payload.token,
      }

    case types.logout:
      return {
        logged: false,
      }

    case types.setMode:
      return {
        ...state,
        mode: action.payload,
      }

    default:
      return state
  }
}
