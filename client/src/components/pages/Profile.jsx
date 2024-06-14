import { useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
import NewIssueForm from '../sections/NewIssueForm'
import Issue from '../sections/Issue'

export default function Profile() {
  const {issues, user: { username }, getUserIssues} = useContext(UserContext)
  const mappedIssues = issues.map(info => <Issue {...info} key={info._id} theme={'dark'} />)
  
  useEffect(() => {
    getUserIssues()
  }, [])
  
  return (
    <>
      <header>Welcome #{username}</header>

      <NewIssueForm />

      <div className="issuesContainer">
        <h1>Your Issues</h1>
        {mappedIssues}
      </div>
    </>
  )
}