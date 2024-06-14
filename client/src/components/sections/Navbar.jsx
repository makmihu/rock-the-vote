import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const {logout} = useContext(UserContext)

  return (
    <nav>
      <Link to='/profile' className='navLink'>Profile</Link>
      <Link to='/issues' className='navLink'>Issues</Link>
      <button onClick={logout} className='navLink'>Logout</button>
    </nav>
  )
}