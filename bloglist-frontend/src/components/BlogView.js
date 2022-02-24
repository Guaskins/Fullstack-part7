/* eslint-disable linebreak-style */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { likeBlog } from '../reducers/blogReducer'
import { addComment, removeBlog } from '../reducers/blogReducer'
import { Button, Form, Row, Col, ListGroup } from 'react-bootstrap'

const BlogView = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const id = useParams().id
  const blog = blogs.find((blog) => blog.id === id)

  const handleAddComment = (e) => {
    e.preventDefault()
    dispatch(addComment(blog, e.target.comment.value))
    e.target.comment.value = ''
  }

  const handleRemoveBlog = (e) => {
    e.preventDefault()
    dispatch(removeBlog(blog))
    navigate('/')
  }

  if (!blog) {
    return null
  }
  return (
    <div style={{ display: 'block', width: 700, padding: 30 }}>
      <h3>{blog.title}</h3>
      <span><a href={blog.url} target='_blank' rel='noreferrer'>{blog.url}</a></span><br/>
      <span>{blog.likes} likes </span><Button id='likes' style={{ width:'fit-content' }} size='sm' variant='dark' onClick={() => dispatch(likeBlog(blog))}>like</Button><br/>
      <span>Added by {blog.author}</span>
      <div style={{ display: blog.user.id === user.id ? 'block' : 'none' }}>
        <Button id='remove-blog' variant='dark' style={{ width:'fit-content' }} onClick={handleRemoveBlog}>remove</Button>
      </div>
      <div style={{ marginTop:'15px' }} className = 'comments'>
        <Form onSubmit={handleAddComment}>
          <Row>
            <Col>
              <Form.Control name='comment' type='text' placeholder='comments' size='sm'/>
            </Col>
            <Button variant='dark' style={{ width:'fit-content' }} size='sm' type="submit">add comment</Button>
          </Row>
        </Form>
        <h6 style={{ marginTop:'15px' }}>Comments</h6>
        {blog.comments.map((comment, index) => (
          <ListGroup key={index}>
            <ListGroup.Item variant='light' style={{ margin:'1px', height:'fit-content' }}>
              {comment}
            </ListGroup.Item>
          </ListGroup>
        ))}
      </div>
    </div>
  )
}

export default BlogView