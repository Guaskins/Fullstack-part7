/* eslint-disable linebreak-style */
/* eslint-disable indent */
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const reducer = (state = [], action) => {
  console.log('BLOG state now: ', state)
  console.log('BLOG action', action)

  switch(action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    case 'LIKE_BLOG':
      return state.map((item) =>
        item.id === action.data.id ? { ...item, likes: item.likes + 1 } : item
      )
    case 'REMOVE_BLOG':
      return state.filter((item) => item.id !== action.data)
    case 'NEW_COMMENT':
      return state.map((item) =>
        item.id !== action.data.id ? item : action.data
      )
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    console.log('initializeBlogs: ', blogs)
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = content => {
  return async dispatch => {
    try {
      const response = await blogService.create(content)
      dispatch(initializeBlogs())
      dispatch(setNotification(`You added a new blog: ${response.data.title}`, '0'))
      dispatch({
        type: 'NEW_BLOG',
        data: response.data,
      })
    } catch (error) {
      dispatch(setNotification(`${error.response.data.error}`, '1'))
    }
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    try {
      await blogService.update(blog.id, likedBlog)
      dispatch(setNotification(`You liked ${likedBlog.title}`, '0'))
      dispatch({
        type: 'LIKE_BLOG',
        data: likedBlog,
      })
    } catch (error) {
      dispatch(setNotification(`${error.response.data.error}`, '1'))
    }
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id)
      dispatch(setNotification('You deleted the blog!', '0'))
      dispatch({
        type: 'REMOVE_BLOG',
        data: blog.id,
      })
    } catch (error) {
      dispatch(setNotification(`${error}`, '1'))
    }
  }
}

export const addComment = (blog, comment) => {
  return async (dispatch) => {
    if (comment === '' || comment === null) {
      dispatch(setNotification('your comment is blank !!', '1'))
    } else {
      const updatedBlog = { ...blog, comments: [...blog.comments, comment] }
      try {
        await blogService.createComments(updatedBlog)
        dispatch(initializeBlogs())
        dispatch(setNotification(`You added a comment: ${comment}`, '0'))
        dispatch({
          type: 'NEW_COMMENT',
          data: updatedBlog,
        })
      } catch (error) {
        dispatch(setNotification(`${error}`, '1'))
      }
    }
  }
}

export default reducer