import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../Assets/logo.png'

function Navbar() {
    return (
        <nav className="navbar navbar-dark navbar-expand-lg fixed-top py-3" id="mainNav" style={{background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)', boxShadow: '0 4px 20px rgba(13, 148, 136, 0.3)'}}>
            <div className="container px-4 px-lg-5">
                <Link to='/sign-translator/home' className="navbar-brand mb-0 h1" style={{ fontSize: '18px' }}>
                    <img
                        src={logo}
                        width="32"
                        height="32"
                        className="d-inline-block align-top me-3"
                        alt="Logo"
                    />
                    Sign Translator
                </Link>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto my-2 my-lg-0">
                        <li className="nav-item"><Link to='/sign-translator/home' className="nav-link active" style={{ fontSize: '16px' }}>Home</Link></li>
                        <li className="nav-item"><Link to='/sign-translator/convert' className="nav-link" style={{ fontSize: '16px' }}>Convert</Link></li>
                        <li className="nav-item"><Link to='/sign-translator/learn-sign' className="nav-link" style={{ fontSize: '16px' }}>Learn Sign</Link></li>
                        <li className="nav-item"><Link to='/sign-translator/feedback' className="nav-link" style={{ fontSize: '16px' }}>Feedback</Link></li>

                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar