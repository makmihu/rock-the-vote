import React from 'react'

export default function LoginForm(props) {
  const {
    handleChange, 
    handleSubmit, 
    btnText, 
    inputs: {
      username, 
      password
    } 
  } = props  
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={username} 
        name="username" 
        onChange={handleChange} 
        placeholder="Username"
      />

      <input 
        type="text" 
        value={password} 
        name="password" 
        onChange={handleChange} 
        placeholder="Password"
      />

      <button>{ btnText }</button>
      <p style={{color: "red", paddingTop: "10px"}}>{props.errMsg}</p>
    </form>
  )
}