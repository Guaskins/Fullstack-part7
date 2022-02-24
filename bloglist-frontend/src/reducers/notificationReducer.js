/* eslint-disable linebreak-style */
/* eslint-disable indent */

const notificationReducer = (state = null, action) => {
  // console.log('NOTI state now: ', state)
  // console.log('NOTI action', action)
  switch (action.type) {
    case 'SET':
      return action.data
    case 'HIDE':
      return null
    default:
      return state
  }
}

export const clearNotification = () => {
  return async (dispatch) => {
    dispatch({
        type: 'HIDE',
        data: null
      })
  }
}

export const setNotification = ( message, typeError ) => {
  window.clearTimeout(window.timeout)

  return async (dispatch) => {
    dispatch({
      type: 'SET',
      data: { message, typeError }
    })

    window.timeout = setTimeout(() => {
      dispatch({ type: 'HIDE', data: null })
    }, 5000)
  }

}

export default notificationReducer