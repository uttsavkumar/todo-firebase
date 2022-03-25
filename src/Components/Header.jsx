import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
const Header = () => {

    const nav = useNavigate()
    return (
        <div>
            <div className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <div className="navbar-brand">Todo</div>
                </div>
                {localStorage.getItem('userData') && <ul className="navbar-nav">
                    <li className="nav-item">
                        <button type="button" className="btn btn-primary" onClick={() => {
                            localStorage.clear()
                            console.log("logout")
                            nav("/login")
                        }} >Logout</button>
                    </li>
                </ul>
                }
            </div>
        </div>
    )
}

export default Header