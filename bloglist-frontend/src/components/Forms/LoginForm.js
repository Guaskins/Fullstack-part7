/* eslint-disable linebreak-style */
/* eslint-disable indent */
import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../reducers/loginReducer'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value
    // console.log('LOGIN form: ', username, password)
    dispatch(login(username, password))
    navigate('/')
  }

  return (
    <div>
      <h2>log in to application</h2>
        <Form onSubmit={handleLogin}>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
          />
          <br/>
          <Button variant="dark" type="submit">
            login
          </Button>
      </Form>
    </div>
  )
}

export default LoginForm