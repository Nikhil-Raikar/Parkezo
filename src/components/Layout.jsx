import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Chatbot from './Chatbot';
import './Layout.css';

const Layout = () => {
    return (
        <div className="layout-container">
            <Navbar />
            <main className="main-content">
                <Outlet />
            </main>
            <Chatbot />
        </div>
    );
};

export default Layout;
