/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Routes,
  Route,
  // Link,
  // useNavigate,
  // useMatch 
} from 'react-router-dom'

import BlogList from './components/BlogList'
import UserList from './components/UserList'
import UserView from './components/UserView'
import BlogView from './components/BlogView'
import Notification from './components/Notification'
import Footer from './components/Footer'
import Menu from './components/Menu'

import LoginForm from './components/Forms/LoginForm'
import BlogForm from './components/Forms/BlogForm'
import Togglable from './components/Togglable'

import { initializeBlogs } from './reducers/blogReducer'
import { clearNotification } from './reducers/notificationReducer'
import { initUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/usersReducer'

import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(clearNotification())
    dispatch(initUser())
    dispatch(initializeUsers())
  }, [dispatch])

  
  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  )

  const AllBlogs = () => {
    return (
      <div>
        {blogForm()}
        <BlogList />
      </div>
    )
  }

  return (
    <div className="container">
      <Menu />
      <Notification />
      {user === null || user === undefined ?
        <LoginForm /> :
        <div>
          <Routes>
            <Route path="/users" element={ <UserList /> } />
            <Route path="/users/:id" element={ <UserView /> } />
            <Route path="/:id" element={ <BlogView /> } /> 
            <Route path="/login" element={ <LoginForm /> } />
            <Route path="/" element={ <AllBlogs />} />
          </Routes>
        </div>
      }
      <Footer />
    </div>
  )
}

export default App