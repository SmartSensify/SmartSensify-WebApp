import React, { useEffect, useState } from 'react';
import { getLoggedUserData } from '../utils/api';
import { useNavigate } from 'react-router-dom';

// Utils
import { removeAuthToken } from '../utils/auth';
import { Link } from 'react-router-dom';

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
        <div>
            <h2>Dashboard</h2>
            {userData && (
                <div>
                    <p>Username: {userData.username}</p>
                    <p>Email: {userData.email}</p>
                    <p>Last Login Date: {userData.lastLoginDate}</p>
                </div>
            )}
            <button onClick={handleLogout}>Logout</button>
            <Link to="/dashboard/groups">Groups</Link> 
        </div>
    ); // TODO: Make this link relative
};

export default Dashboard;
