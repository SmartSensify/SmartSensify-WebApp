import React, { useEffect, useState } from 'react';
import { getLoggedUserData } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { Outlet, useLocation } from 'react-router-dom';

// Utils
import { removeAuthToken } from '../utils/auth';
import { Link } from 'react-router-dom';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../styles/dashboardPage.css';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<any>(null);
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
    const [headerText, setHeaderText] = useState<string>('Default Header Text');
    const location = useLocation();

    useEffect(() => {
        console.log("Site update");
        const storedTheme = localStorage.getItem('theme');

        if (storedTheme === 'dark') {
            applyDarkTheme();
        } else {
            removeDarkTheme();
        }

        const fetchUserData = async () => {
            const response = await getLoggedUserData();
            setUserData(response.data);
        };
        fetchUserData();

        const outletElement = document.getElementById('main-content');
        const elementName = outletElement?.dataset.name;
        setHeaderText(elementName || 'Default Header Text');
    }, [location.pathname]);

    const handleLogout = () => {
        removeAuthToken();
        navigate('/');
    };

    const applyDarkTheme = () => {
        const pageElement = document.getElementById('page-dashboard');
        const switchElement = document.getElementById('flexSwitchCheckDefault') as HTMLInputElement;

        if (pageElement && switchElement) {
            switchElement.checked = true;
            pageElement.setAttribute('data-bs-theme', 'dark');
            setIsDarkTheme(true);
        }
    };

    const removeDarkTheme = () => {
        const pageElement = document.getElementById('page-dashboard');

        if (pageElement) {
            pageElement.removeAttribute('data-bs-theme');
            setIsDarkTheme(false);
        }
    };

    const changeTheme = () => {
        const pageElement = document.getElementById('page-dashboard');

        if (pageElement) {
            const hasThemeAttribute = pageElement.hasAttribute('data-bs-theme');
            if (!hasThemeAttribute) {
                pageElement.setAttribute('data-bs-theme', 'dark');
                setIsDarkTheme(true);
                localStorage.setItem('theme', 'dark');
            } else {
                pageElement.removeAttribute('data-bs-theme');
                setIsDarkTheme(false);
                localStorage.removeItem('theme');
            }
        }
    };

    return (
        <div className="container-fluid vh-100" id="page-dashboard" data-bs-theme="dark">
            <div className="row h-100 overflow-hidden">
                {/* Left Menu Pane */}
                <nav className="col-md-3 col-lg-2 d-md-block sidebar p-3">
                    <div className="text-center mb-4">
                        <img id="image-logo" className="img-fluid mb-3 noselect" src="/images/smartsensify_logo_white.png" alt="Logo" />
                    </div>
                    <div>
                        <div className="nav flex-column">
                            <Link to="overview">
                                <div className="nav-button noselect">
                                    <span className="nav-icon-center material-symbols-outlined">
                                        dashboard
                                    </span>
                                    Overview
                                </div>
                            </Link>
                            <Link to="groups"> {/* TODO: Make this and other links relative */}
                                <div className="nav-button noselect">
                                    <span className="nav-icon-center material-symbols-outlined">
                                        sensors
                                    </span>
                                    Sensors
                                </div>
                            </Link>
                            <Link to="alerts">
                                <div className="nav-button noselect">
                                    <span className="nav-icon-center material-symbols-outlined">
                                        notifications
                                    </span>
                                    Alerts
                                </div>
                            </Link>
                            <Link to="analysis">
                                <div className="nav-button noselect">
                                    <span className="nav-icon-center material-symbols-outlined">
                                        monitoring
                                    </span>
                                    Analysis
                                </div>
                            </Link>
                            <Link to="reports">
                                <div className="nav-button noselect">
                                    <span className="nav-icon-center material-symbols-outlined">
                                        problem
                                    </span>
                                    Reports
                                </div>
                            </Link>
                            <Link to="settings">
                                <div className="nav-button noselect">
                                    <span className="nav-icon-center material-symbols-outlined">
                                        settings
                                    </span>
                                    Settings
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-4">
                        <a href="mailto:jakub.robert.krok@gmail.com">
                            <button className="btn button-nav-bottom">
                                <i className="bi bi-google"></i> Contact Us
                            </button>
                        </a>
                        <button className="btn button-nav-bottom" onClick={handleLogout}>
                            <i className="bi bi-google "></i> Logout
                        </button>
                        <div className="nav-bottom">
                        </div>
                    </div>
                </nav>

                {/* Right Pane */}
                <div className="col-md-9 col-lg-10 px-0 ">
                    {/* Header */}
                    <header className="d-flex justify-content-between align-items-center bg-body-secondary text-body-secondary p-2">
                        <div>
                            <p id="header-text" className="lh-sm"><h3>{headerText}</h3></p>
                        </div>
                        <div className='header-right d-flex align-items-center'>
                            <div className='header-notifications noselect'>
                                <span className="nav-icon-center material-symbols-outlined">
                                    notifications
                                </span>
                            </div>
                            <div className="dropdown">
                                <div className="" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="true">
                                    <div className='header-username cursor-pointer d-flex align-items-center noselect'>
                                        <div className='header-username-image'>
                                            <img id="image-user" className="img-fluid mb-3 rounded-circle" src="/images/person.png" alt="Person image" />
                                        </div>
                                        <div className='header-username-text'>
                                            {userData?.username || "Username loading..."}
                                        </div>
                                        <div>
                                            <span className="nav-icon-center material-symbols-outlined">
                                                expand_more
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <ul className="dropdown-menu p-3" aria-labelledby="dropdownMenuButton1">
                                    <li className="mb-4">
                                        {userData?.email || "email loading"}
                                    </li>
                                    <li className="mb-2">
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={changeTheme} />
                                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Dark Mode</label>
                                        </div>
                                    </li>
                                    <li className="mb-2">
                                        <select className="form-select" aria-label="Default select example">
                                            <option selected>English</option>
                                            <option value="polish">Polish</option>
                                            <option value="chineese">Chinese</option>
                                        </select>
                                    </li>
                                    <li className="mb-2">
                                        <button className="btn btn-danger w-100" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </header>

                    {/* Main Content */}
                    <main className="p-3 pt-5 scrollable-container bg-body text-body">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
