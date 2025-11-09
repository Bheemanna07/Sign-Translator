import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="page-footer font-small unique-color-dark mt-5">

            <div style={{background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)', boxShadow: '0 4px 15px rgba(0,0,0,0.1)'}}>
                <div className="container">
                    <div className="row py-4 d-flex justify-content-center align-items-center">
                        <div className="col-md-6 col-lg-5 text-center footer-text text-white">
                            <span style={{letterSpacing: '0.5px', fontWeight: '500', fontSize: '16px'}}>
                                The complete toolkit for Indian Sign Language.
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container-fluid text-white pt-3' style={{background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 50%, #14b8a6 100%)', boxShadow: '0 -4px 15px rgba(0,0,0,0.1)'}}>
                <div className="container text-md-left mt-5">
                    <div className="row mt-3">
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                            <h6 className="text-uppercase font-weight-bold" style={{ fontSize: '18px' }}>SIGN TRANSLATOR</h6>
                            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width:'60px'}}/>
                            <p className='footer-text' style={{ fontSize: '16px' }}>A comprehensive toolkit containing various features related to Indian Sign Language.</p>
                        </div>
                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase font-weight-bold" style={{ fontSize: '18px' }}>Services</h6>
                            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width:'60px'}} />
                            <p><Link to='/sign-translator/convert' className='footer-link' style={{color: '#93c5fd', textDecoration: 'none', transition: 'color 0.3s', fontSize: '16px'}}>Convert</Link></p>
                            <p><Link to='/sign-translator/learn-sign' className='footer-link' style={{color: '#93c5fd', textDecoration: 'none', transition: 'color 0.3s', fontSize: '16px'}}>Learn Sign</Link></p>
                            <p><Link to='/sign-translator/all-videos' className='footer-link' style={{color: '#93c5fd', textDecoration: 'none', transition: 'color 0.3s', fontSize: '16px'}}>Videos</Link></p>
                        </div>

                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase font-weight-bold" style={{ fontSize: '18px' }}>Useful links</h6>
                            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width:'60px'}} />
                            <p><Link to='/sign-translator/home' className='footer-link' style={{ fontSize: '16px' }}>Home</Link></p>
                            <p><Link to='/sign-translator/feedback' className='footer-link' style={{ fontSize: '16px' }}>Feedback</Link></p>
                        </div>


                    </div>
                </div>

            </div>
            </footer>
    )
}

export default Footer