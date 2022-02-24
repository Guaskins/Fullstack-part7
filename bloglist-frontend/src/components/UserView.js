/* eslint-disable linebreak-style */
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const UserView = () => {
  const users = useSelector((state) => state.users)
  const id = useParams().id
  const user = users.find((user) => user.id === id)
  if (!user) {
    return null
  }
  return (
    <div style={{ display: 'block', width: 700, padding: 30 }}>
      <h3>User: {user.name}</h3>
      <h6>Added Blogs</h6>
      <Table striped>
        <tbody>
          {user.blogs
            .sort((min, max) => max.likes - min.likes)
            .map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/${blog.id}`}>{blog.title}</Link>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
}

export default UserView