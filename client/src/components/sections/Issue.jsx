import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import AddCommentForm from './AddCommentForm'
import Comment from './Comment'

export default function Issue(props) {
  const { allComments, upVoteIssue, downVoteIssue } = useContext(UserContext)
  const {title, description, upvotes, downvotes, theme, username, _id} = props
    
  const filteredComments = allComments.filter(comment => comment.issue === _id) 
  const mappedComments = filteredComments.map(info => <Comment key={info._id} {...info} />)
  
  return (
    <div className={`issue ${theme}`}>
      <h1 className={`${theme}Border`}>{title}</h1>

      <p>posted by: #{username}</p>

      <h3>{description}</h3>

      <div className={`splitContainer ${theme}Border`}>
        <div>
          <span>{upvotes.length} Upvotes</span>
          <button onClick={() => upVoteIssue(_id)} className={`voteBtn ${theme}Btn`}>^</button>
        </div>

        <div>
          <span>{downvotes.length} Downvotes</span>
          <button onClick={() => downVoteIssue(_id)} className={`voteBtn ${theme}Btn`}>^</button>
        </div>
      </div>

      <AddCommentForm _id={ _id } theme={ theme } />

      <div className='commentsContainer'>
        {mappedComments}
      </div>
    </div>
  )
}