import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import AuthService from '../Services/AuthService'
import {AuthContext} from '../Context/AuthContext'

export const Navbar = (props) => {
    const {isAuthenticated,user,setIsAuthenticated, setUser} = useContext(AuthContext)
    const onClickLogoutHandler = () => {
        AuthService.logout().then(data=> {
            if(data.success) {
                setUser(data.user)
                setIsAuthenticated(false)
            }
        })
    }
    const unauthenticatedNavbar = () => {
        return (
            <React.Fragment>
                <Link to="/">
                    <li className="nav-item nav-link">
                        Home
                    </li>
                </Link>
                <Link to="/login">
                    <li className="nav-item nav-link">
                        Login
                    </li>
                </Link>
                <Link to="/register">
                    <li className="nav-item nav-link">
                        Register
                    </li>
                </Link>
            </React.Fragment>
        )
    }
    const authenticatedNavbar = () => (
        <React.Fragment>
                <Link to="/">
                    <li className="nav-item nav-link">
                        Home
                    </li>
                </Link>
                <Link to="/todos">
                    <li className="nav-item nav-link">
                        Todos
                    </li>
                </Link>
                {
                    user.role === 'admin' &&
                    <Link to="/admin">
                        <li className="nav-item nav-link">
                            Admin panel
                        </li>
                    </Link>
                }
                <button type="button" className="btn btn-link nav-item nav-link" onClick={()=>onClickLogoutHandler}>Logout</button>
            </React.Fragment>
    )
    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link to="/" >
      <div className="navbar-brand">
        Noob Coder
      </div>
  </Link>
  <div className="collapse navbar-collapse" id="navbarText">
    <ul className="navbar-nav mr-auto">
      {!isAuthenticated ? unauthenticatedNavbar() : authenticatedNavbar()}
      </ul>
    <span className="navbar-text">
      Navbar text with an inline element
    </span>
  </div>
</nav>
    )
}