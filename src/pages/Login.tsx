import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Utils
import { loginUser } from '../utils/api';

// Styles
import '../styles/loginPage.css';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState<string | null>(null);

    const handleLogin = async () => {
        try {
            await loginUser({
                identifier: username,
                password: password,
            });

            setLoginError(null);
            navigate('/dashboard');

        } catch (error) {
            console.error('Login failed:', error);
            setLoginError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {loginError && <div style={{ color: 'red' }}>{loginError}</div>}
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
