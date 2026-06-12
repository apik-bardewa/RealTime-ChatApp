import React from 'react'
import { useSelector } from 'react-redux'


function Profilechat() {
    let user = useSelector(state=>state.user)
  return (
    <div>
        <p>{user.name}</p> 
    </div>
  )
}

export default Profilechat