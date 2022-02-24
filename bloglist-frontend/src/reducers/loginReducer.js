/* eslint-disable linebreak-style */
/* eslint-disable indent */
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const loginReducer = (state = null, action) => {
  // console.log('LOGIN state now: ', state)
  // console.log('LOGIN action', action)
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return action.data
    case 'INIT_USER':
        return action.data
    default:
      return state
  }
}

export const initUser = () => {
  return async (dispatch) => {
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        // console.log('USER from localStorage: ', user)
        dispatch({
          type: 'INIT_USER',
          data: user,
        })
        blogService.setToken(user.token)
      }
      else {
        dispatch({
          type: 'INIT_USER',
          data: null,
        })
      }
    } catch (error) {
      dispatch(setNotification('Wrong Username or Password', '1'))
    }
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBloglistAppUser', JSON.stringify(user))
      // console.log('loginR}educer: ', user)
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data: user,
      })
      dispatch(setNotification(`Welcome! ${user.username} logged in`, '0'))
    } catch (error) {
      dispatch(setNotification('Wrong Username or Password', '1'))
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBloglistAppUser')
    dispatch({
      type: 'LOGOUT',
      data: null
    })
  }
}

export default loginReducer