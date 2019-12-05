/** @format */

import * as React from 'react'
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom'

import useLogin from '../utils/useLogin'

interface INavigation extends RouteComponentProps {}

const Navigation: React.FC<INavigation> = ({ history }) => {
    const { logout, isLoggedIn } = useLogin()
    const [centerHome, setCenterHome] = React.useState(false)

    const handleLogout: React.MouseEventHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        logout()
        history.push('/')
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark w-100 ml-0">
            <div
                className={
                    'my-1 mx-sm-3' +
                    // (centerHome ? ' mx-auto' : '') // Have to wait until bug fixed
                    ' mx-auto'
                }
            >
                <NavLink to="/home" className="nav-item btn btn-dark">
                    Home
                </NavLink>
            </div>
            {/* <button
                className="navbar-toggler ml-n5"
                type="button"
                data-toggle="collapse"
                data-target="#navbarCollapser"
                onClick={() => setCenterHome(!centerHome)}
            >
                <span className="navbar-toggler-icon"></span>
            </button> */}
            {/* Have to add show by default until bug with bootstrap and
                onChange in donation page is resolved */}
            <div className="collapse navbar-collapse show" id="navbarCollapser">
                {isLoggedIn ? (
                    <>
                        <div className="navbar-nav align-items-center mr-auto">
                            <NavLink to="/mytimeline" className="nav-item btn btn-dark my-1 mx-3">
                                My Timeline
                            </NavLink>
                            <NavLink to="/writeblog" className="nav-item btn btn-dark my-1 mx-3">
                                New Blog
                            </NavLink>
                        </div>
                        <div className="navbar-nav align-items-center">
                            <button
                                role="button"
                                className="nav-item btn btn-dark my-1 mx-3"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="navbar-nav align-items-center ml-auto">
                        <NavLink to="/login" className="nav-item btn btn-dark my-1 mx-3 ml-sm-auto">
                            Login
                        </NavLink>
                        <NavLink to="/register" className="nav-item btn btn-dark my-1 mx-3">
                            Register
                        </NavLink>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default withRouter(Navigation)
