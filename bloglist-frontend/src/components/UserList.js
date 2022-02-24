/* eslint-disable linebreak-style */
/* eslint-disable indent */
import React from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const UserList = () => {
  const users = useSelector((state) => state.users)
//   console.log('UserList > Número de users', users.length)
  return(
    <div style={{ display: 'block', width: 700, padding: 30 }}>
        <h2>Users</h2>
        <Table striped>
            <tbody>
                <tr>
                    <td><b>User name</b></td>
                    <td><b>Added blogs</b></td>
                </tr>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>
                            <Link to={`/users/${user.id}`}>{user.name}</Link>
                        </td>
                        <td>
                            {user.blogs.length}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>
  )
}

export default UserList