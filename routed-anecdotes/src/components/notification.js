const Notification = ({ message }) => {

  const style = {
    border: '3px solid dodgerblue',
    padding: 10
  }

  if (message === null) {
    return (<div/>)
  }
  
  return (
    <div style={style}>
        {message}
    </div>
  )
}

export default Notification
