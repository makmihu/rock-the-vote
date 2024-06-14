import { useState, useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import LoginForm from '../sections/LoginForm'

export default function Login() {
  const {signup, login, errMsg, resetAuthErr} = useContext(UserContext)
  const initInputs = { username: "", password: "" }
  const [inputs, setInputs] = useState(initInputs)
  const [toggle, setToggle] = useState(false)
  
  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSignup(e){
    e.preventDefault()
    signup(inputs)
  }

  function handleLogin(e){
    e.preventDefault()
    login(inputs)
  }

  function toggleForm(){
    setToggle(prev => !prev)
    resetAuthErr()
  }

  return (
    <main>
      <div className='loginContainer'>
        <h1>Rock the Vote</h1>
        {!toggle ? 
            <>
              <LoginForm 
                handleChange={handleChange}
                handleSubmit={handleSignup}
                inputs={inputs}
                btnText="Sign up"
                errMsg={errMsg}              
              />
              <p onClick={toggleForm}>Already a Member?</p>
            </> 
        : 
            <>
              <LoginForm 
                handleChange={handleChange}
                handleSubmit={handleLogin}
                inputs={inputs}
                btnText="Login"
                errMsg={errMsg}              
              />
              <p onClick={toggleForm}>Need to Signup?</p>
            </> 
        }
      </div>
    </main>
  )
}