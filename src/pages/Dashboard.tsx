import React, { useEffect, useState } from 'react';
import { getLoggedUserData } from '../utils/api';
import { useNavigate } from 'react-router-dom';

// Utils
import { removeAuthToken } from '../utils/auth';
import { Link } from 'react-router-dom';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/dashboardPage.css';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await getLoggedUserData();
            setUserData(response.data);
        };
        fetchUserData();
    }, []);

    const handleLogout = () => {
        removeAuthToken();
        navigate('/');
    };

    return (
        <div className="container-fluid vh-100" id="page-dashboard">
            {/* <h2>Dashboard</h2>
            {userData && (
                <div>
                    <p>Username: {userData.username}</p>
                    <p>Email: {userData.email}</p>
                    <p>Last Login Date: {userData.lastLoginDate}</p>
                </div>
            )}
            <button onClick={handleLogout}>Logout</button>
            <Link to="/dashboard/groups">Groups</Link> */}
            {/* TODO: Make this link relative */}

            {/* Left Menu Pane */}
            <div className="row h-100 overflow-hidden">
                <nav className="col-md-3 col-lg-2 d-md-block sidebar text-white p-3">
                    <div className="text-center">
                        <img id="image-logo" className="img-fluid mb-3" src="/images/smartsensify_logo_white.png" alt="Logo" />
                    </div>
                    <div>
                        <div className="nav flex-column">
                            <a href="#">
                                <div className="nav-button">
                                    <span className="nav-icon-center material-symbols-outlined">
                                        dashboard
                                    </span>
                                    Overview
                                </div>
                            </a>
                            <a href="#">
                                <div className="nav-button">
                                    <span className="nav-icon-center material-symbols-outlined">
                                        sensors
                                    </span>
                                    <Link to="/dashboard/groups">
                                        Sensors
                                    </Link>
                                </div>
                            </a>
                            <a href="#">
                                <div className="nav-button">
                                    <span className="nav-icon-center material-symbols-outlined">
                                        notifications
                                    </span>
                                    Alerts
                                </div>
                            </a>
                            <a href="#">
                                <div className="nav-button">
                                    <span className="nav-icon-center material-symbols-outlined">
                                        monitoring
                                    </span>
                                    Analisis
                                </div>
                            </a>
                            <a href="#">
                                <div className="nav-button">
                                    <span className="nav-icon-center material-symbols-outlined">
                                        problem
                                    </span>
                                    Reports
                                </div>
                            </a>
                            <a href="#">
                                <div className="nav-button">
                                    <span className="nav-icon-center material-symbols-outlined">
                                        settings
                                    </span>
                                    Settings
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="mt-auto">
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
                <div className="col-md-9 col-lg-10 px-0">
                    {/* Header */}
                    <header className="d-flex justify-content-between align-items-center bg-white p-2">
                        <div>
                            Welcome back @
                            {userData && (
                                <>
                                    {userData.username}
                                </>
                            )}
                        </div>
                        {userData && (
                            <>
                                {userData.email}
                            </>
                        )}
                    </header>

                    {/* Main Content */}
                    <main className="p-3 scrollable-container">
                        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                        <br />hello<br />hello<br />hello<br />hello<br />hello<br /><br /><br /><br /><br /><br /><br />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
