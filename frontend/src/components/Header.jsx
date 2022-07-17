import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'
import {IconButton} from '@mui/material'
//import lazLogo from '../logos/lazaustinlogosvg.svg'

function Header() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }
    //<img src= {lazLogo} alt='' /> add this before Streaming Video License Manager at some point
  return (
    <header className='header'>
        <div className='logo'>
             
            <Link to='/'>Streaming Video License Manager</Link>
        </div>
        <ul>
            {user ? (
            <>
                <li>
                    <IconButton>
                        <Link to='/'>
                            Home
                        </Link>
                    </IconButton>
                </li>
                <li>
                    <IconButton>
                        <Link to='/table'>
                            Table
                        </Link>
                    </IconButton>
                </li>
                <li>
                    <button className='btn' onClick={onLogout}>
                        <FaSignOutAlt/> Logout
                    </button>
                </li>
                
            </>
            ) : (
            <>
                <li>
                    <Link to='/login'>
                        <FaSignInAlt/> Login
                    </Link>
                </li>
                <li>
                    <Link to='/register'>
                        <FaUser/> Register
                    </Link>
                </li>
            </>
            )}
        </ul>
    </header>
  )
}

export default Header