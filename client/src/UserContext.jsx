import { useState, createContext, useEffect} from 'react'
import axios from 'axios'

export const UserContext = createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export default function UserProvider(props){
  const initState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    issues: JSON.parse(localStorage.getItem("issues")) || [],
    errMsg: ""
  }
  
  const [userState, setUserState] = useState(initState)
  const [allComments, setAllComments] = useState([])
  const [allIssues, setAllIssues] = useState([])

  const signup = async (credentials) => {
    try {
      const res = await axios.post('/api/auth/signup', credentials)
      const {user, token} = res.data
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user)) 
      setUserState(prev => ({
        ...prev,
        user, 
        token
      })) 
    } catch (err) {
      handleAuthErr(err.response.data.errMsg)
    }
  }

  const login = async (credentials) => {
    try {
      const res = await axios.post('/api/auth/login', credentials)  
      const {user, token} = res.data
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      getUserIssues() 
      setUserState(prev => ({
        ...prev,
        user, 
        token
      }))
    } catch (err) {
      handleAuthErr(err.response.data.errMsg)
    }
  }

  function logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUserState({
      user: {},
      token: '',
      issues: []
    })
  }

  function handleAuthErr(errMsg){
    setUserState(prev => ({
      ...prev,
      errMsg
    }))
  }

  function resetAuthErr(){
    setUserState(prev => ({
      ...prev,
      errMsg: ''
    }))
  }

  const getUserIssues = async () => {
    try {
      const res = await userAxios.get('/api/secured/issues/user')
      setUserState(prev =>({
        ...prev,
        issues: res.data
      }))
      localStorage.setItem('issues', JSON.stringify(res.data))    
    } catch (err) {
     console.log(err.response.data.errMsg)    
    }
  }

  const addIssue = async (newIssue) => {
    try {
      const res = await userAxios.post('/api/secured/issues', newIssue)
      setUserState(prev =>({
        ...prev,
        issues: [...prev.issues, res.data]
      }))
    } catch (err) {
      console.log(err.response.data.errMsg)    
    }
  }

  const getAllIssues = async () => {
    try {
      const res = await userAxios.get('/api/secured/issues')
      setAllIssues(res.data)
    } catch (err) {
     console.log(err)    
    }
  }
  const getAllComments = async () => {
    try {
      const res = await userAxios.get('/api/secured/comments')
      setAllComments(res.data) 
    } catch (err) {
      console.log(err)    
    }
  }

  const addComment = async (newComment, issueId) => {
    try {
      const res = await userAxios.post(`/api/secured/comments/${issueId}`, newComment)
      setAllComments(prev => [ ...prev, res.data])
    } catch (err) {
      console.log(err)
    }
  }
  
  const upVoteIssue = async (issueId) => {
    try {
      console.log(issueId)
      const res = await userAxios.put(`/api/secured/issues/upVote/${issueId}`)
      setAllIssues(prev => prev.map(issue => issueId !== issue._id ? issue : res.data))
      setUserState(prev => ({...prev, issues: prev.issues.map(issue => issueId !== issue._id ? issue : res.data)}))
    } catch (err) {
      console.log(err)
    }
  }
  const downVoteIssue = async (issueId) => {
    try {
      const res = await userAxios.put(`/api/secured/issues/downVote/${issueId}`)
      setAllIssues(prev => prev.map(issue => issueId !== issue._id ? issue : res.data))
      setUserState(prev => ({...prev, issues: prev.issues.map(issue => issueId !== issue._id ? issue : res.data)}))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAllIssues()
    getAllComments()
  }, [])

  return(
    <UserContext.Provider value={{
      ...userState,
      allIssues,
      allComments,
      setAllComments,
      resetAuthErr,
      signup,        
      login,
      logout,
      addIssue,
      addComment,
      upVoteIssue,
      downVoteIssue,
      getUserIssues
    }}>
      {props.children}
    </UserContext.Provider>
  )
}