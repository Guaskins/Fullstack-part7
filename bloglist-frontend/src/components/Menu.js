/* eslint-disable linebreak-style */
/* eslint-disable indent */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout, initUser } from '../reducers/loginReducer'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Navbar, Nav } from 'react-bootstrap'

const Menu = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state) => state.user)
  const padding = {
    paddingRight: 5
  }

  const setLogout = () => {
    // console.log('setLogout')
    dispatch(logout())
    dispatch(initUser())
    navigate('/login')
  }

  return (
    <div>
      <Navbar collapseOnSelect expand='lg' bg='light' variant='dark'>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to='/'>blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to='/users'>users</Link>
            </Nav.Link>
            {user
              ? <em ><b>{user.name}</b> logged-in <Button variant='dark' id='logout' style={{ width:'fit-content' }} size='sm' onClick={() => setLogout()}>log out</Button></em>
              : <Nav.Link href="#" as="span">
                  <Link style={padding} to="/login">login</Link>
                </Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <h1>Blogs List App</h1>
    </div>
  )
}

export default Menu