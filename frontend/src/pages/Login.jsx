import { useState, useEffect } from "react"
import {FaSignInAlt} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {login, reset} from '../features/auth/authSlice'
import Spinner from "../components/Spinner"
import {Paper, Alert, AlertTitle} from '@mui/material'

function Login() {
    const [formData, setFormData] =useState({
        email: '',
        password: '',
    })

    const {email, password} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector( (state) => state.auth )

    useEffect(() => {

        if (isError) {
            toast.error(message)
        }

        if ( isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    } 

    const onSubmit = (e) => {
        e.preventDefault() 
        const userData = {
            email,
            password
        }
        dispatch(login(userData))
    }

    if (isLoading) {
        return <Spinner/>
    }
  
    return (
        <Paper elevation={3} sx={{p:2, pb: 1}} className="login">
        <Alert severity="info">
            <strong>Employers:</strong> For demo purposes, please use "bob@gmail.com" for the username and "bob" for the password.
        </Alert>
        <section className="heading">
            <h1>
                <FaSignInAlt/> Login
            </h1>
            <p>Login and manage your streaming video licenses</p>
        </section>

        <section className="form">
            <form onSubmit={onSubmit}>
                
                <div className="form-group">
                    <input type="email" className="form-control" id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange}/>
                </div>

                <div className="form-group">
                    <input type="password" className="form-control" id='password' name='password' value={password} placeholder='Enter your password' onChange={onChange}/>
                </div>
                
                <div className="form-group">
                    <button type="submit" className="btn btn-block">Submit</button>
                </div>
            </form>
        </section>
    </Paper>
    )
}

export default Login