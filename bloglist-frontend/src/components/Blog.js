/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [showView, setShowView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    paddingBottom: 10
  }

  const btnRemoveStyle = {
    background: 'blue',
    color: 'white',
  }

  const label = showView
    ? 'hide'
    : 'view'

  if (showView){
    return (
      <div style={blogStyle} className='content-blog'>
        <div className='content-title'>{blog.title}<button id='hide-blog' onClick={() => setShowView(!showView)}>{label}</button></div>
        <div className='content-url'>{blog.url} </div>
        <div className='content-likes'>{blog.likes} <button id='likes' onClick={() => dispatch(likeBlog(blog))}>like</button></div>
        <div className='content-author'>{blog.author} </div>
        <div>user: <i>{blog.user.name}</i></div>
        <div style={{ display: blog.user.id === user.id ? 'block' : 'none' }}>
          <button id='remove-blog' style={btnRemoveStyle} onClick={() => dispatch(removeBlog(blog))}>remove</button>
        </div>
      </div>
    )
  }
  else{
    return (
      <div className='small-content-blog' style={blogStyle}>
        <div>
          {blog.title} by {blog.author}<button id='view-blog' onClick={() => setShowView(!showView)}>{label}</button>
        </div>
      </div>
    )
  }
}

export default Blog
