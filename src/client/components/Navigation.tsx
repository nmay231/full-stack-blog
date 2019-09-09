/** @format */

import * as React from 'react'
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom'

import useLogin from '../utils/useLogin'

interface INavigation extends RouteComponentProps {}

const Navigation: React.FC<INavigation> = ({ history }) => {
    const { logout, isLoggedIn } = useLogin()

    const handleLogout: React.MouseEventHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        logout()
        history.push('/')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark row w-100 ml-0">
            <NavLink to="/home" className="nav-item btn btn-dark my-1 mx-3">
                {' '}
                Home{' '}
            </NavLink>
            {isLoggedIn ? (
                <>
                    <NavLink to="/mytimeline" className="nav-item btn btn-dark my-1 mx-3">
                        {' '}
                        My Timeline{' '}
                    </NavLink>
                    <NavLink to="/writeblog" className="nav-item btn btn-dark my-1 mx-3">
                        {' '}
                        New Blog{' '}
                    </NavLink>
                    <button
                        role="button"
                        className="nav-item btn btn-dark my-1 mx-3 ml-auto"
                        onClick={handleLogout}
                    >
                        {' '}
                        Logout{' '}
                    </button>
                </>
            ) : (
                <>
                    <NavLink to="/login" className="nav-item btn btn-dark my-1 mx-3 ml-auto">
                        {' '}
                        Login{' '}
                    </NavLink>
                    <NavLink to="/register" className="nav-item btn btn-dark my-1 mx-3">
                        {' '}
                        Register{' '}
                    </NavLink>
                </>
            )}
        </nav>
    )
}

export default withRouter(Navigation)
