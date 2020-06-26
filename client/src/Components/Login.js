import React, {useState, useContext} from 'react'
import AuthService from '../Services/AuthService'
import {Message} from '../Components/Message'
import {AuthContext} from '../Context/AuthContext'

export const Login = (props) => {
    const [user, setUser] = useState({username: '', password: ''})
    const [message, setMessage] = useState(null)
    const authContext = useContext(AuthContext)
    console.log(user)
    const onChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
        
    }
    const onSubmit = (e) => {
        e.preventDefault()
        AuthService.login(user).then(data=>{
            const {isAuthenticated, user, message} = data
            if(isAuthenticated) {
                authContext.setUser(user)
                authContext.setIsAuthenticated(isAuthenticated)
                props.history.push('/todos')
            } else {
                setMessage(message)
            }
        })
    }

    return (
        <div className="container">
            <form onSubmit={(e)=>onSubmit(e)}>
                <h3>Please sign in</h3>
                <label htmlFor="username" className="sr-only">Username</label>
                <input type="text"
                name="username" onChange={(e)=>onChange(e)} 
                className="form-control" placeholder="Enter username"/>
                <label htmlFor="password" className="sr-only">Password</label>
                <input type="text"
                name="password" onChange={(e)=>onChange(e)} 
                className="form-control" placeholder="Enter password"/>
                <button className="btn btn-large btn-primary btn-block" type="submit">Log in</button>
            </form>
            {message && <Message message={message}/>}
        </div>
    )
}