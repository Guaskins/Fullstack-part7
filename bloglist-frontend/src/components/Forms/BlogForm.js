/* eslint-disable linebreak-style */
import React from 'react'
import { connect  } from 'react-redux'
import { createBlog } from '../../reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'

const BlogForm = (props) => {

  const addBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      likes: 0
    }

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    props.createBlog(blog)
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <Form onSubmit={addBlog}>
        <Form.Label>Title:</Form.Label>
        <Form.Control
          type='text'
          name='title'
        />
        <Form.Label>Author:</Form.Label>
        <Form.Control
          type='text'
          name='author'
        />
        <Form.Label>URL:</Form.Label>
        <Form.Control
          type='text'
          name='url'
        />
        <Button variant='dark' type='submit'>
          create
        </Button>
      </Form>
    </div>
  )
}

const mapDispatchToProps = {
  createBlog
}

export default connect(
  null,
  mapDispatchToProps
)(BlogForm)