/* eslint-disable linebreak-style */
/* eslint-disable indent */
import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
    const notification = useSelector(state => state.notification)
    // console.log('NOTIFICATION: ', notification)

    if (notification === null || notification === undefined) {
      return (<div/>)
    }
    if (notification.typeError === '0'){
        return (
          <Alert variant='success'>
            {notification.message}
          </Alert>
        )
    }
    else{
        return (
          <Alert variant='danger'>
            {notification.message}
          </Alert>
        )
    }
  }

  export default Notification