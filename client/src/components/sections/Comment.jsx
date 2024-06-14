import React from "react"

export default function Comment(props){
  const {text, username} = props  
  return (
    <div className="comment">
      <h1>{text}</h1>
      <p>Commented by #{username}</p>
    </div>
  )
}