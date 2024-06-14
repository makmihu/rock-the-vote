import { useState, useContext } from 'react'
import { UserContext } from '../../context/UserContext'

export default function AddCommentForm(props) {
  const { addComment } = useContext(UserContext)

  const [commentNew, setCommentNew] = useState({text: ""})

  
  function handleChange(e){
    const {value, name} = e.target
    setCommentNew(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSubmit(e){
    e.preventDefault()
    addComment(commentNew, props._id)
    setCommentNew({text: ""})
  }

  return(
    <form onSubmit={handleSubmit} className='commentForm'>
      <textarea 
        className={`commentTxtarea ${props.theme}Txtarea`}
        name='text'
        value={commentNew.text}
        onChange={handleChange}
        placeholder='Add a New Comment'
      />
      <button className={`commentBtn ${props.theme}Btn`} >Add Comment</button>
    </form>
  )
}