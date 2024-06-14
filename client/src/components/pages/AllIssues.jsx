import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import Issue from '../sections/Issue'

export default function Issues() {
  const { allIssues } = useContext(UserContext)
  const issuesMapped = allIssues.map(info => <Issue {...info} key={info._id} theme={'light'} />)

  return (
    <>
      <header className='issuesHeader'>All Issues</header>
      <div className='issuesContainer'>
        {issuesMapped}
      </div>
    </>
  )
}