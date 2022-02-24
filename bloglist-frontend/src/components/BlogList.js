/* eslint-disable linebreak-style */
/* eslint-disable indent */
import React from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
//import Blog from './Blog'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  console.log('BlogList > Número de blogs', blogs.length)
  return(
    <div>
      <Table striped>
        <tbody>
          {blogs
            .sort((min, max) => max.likes - min.likes)
            .map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/${blog.id}`}>{blog.title}</Link>
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList