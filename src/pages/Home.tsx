import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomePage from '../components/HomePage';

// Utils
import { isAuthenticated } from '../utils/auth';

const Home: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/dashboard');
        }
    }, [navigate]);

    return <HomePage />;
};

export default Home;