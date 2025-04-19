import React from 'react'
import '../style/Footer.scss';
import { FaJsSquare } from "react-icons/fa";
const Footer = () => {
    return (
        <>
            <div className="app">
                <main className="app-main">
                    <h1>Welcome to HMS:37 Hospitals</h1>
                    <p>Your health is our priority.</p>
                </main>
                <footer className="app-footer">
                    <p>&copy; 2023 JS Hospitals. All rights reserved.</p>
                </footer>
            </div>
        </>
    )
}

export default Footer;