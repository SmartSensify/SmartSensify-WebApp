import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Utils
import { loginUser } from '../utils/api';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/loginPage.css';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState<string | null>(null);

    const handleLogin = async () => {

        // Validate forms first

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
            {/* <h2>Login</h2>
            {loginError && <div style={{ color: 'red' }}>{loginError}</div>}
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={handleLogin}>Login</button> */}

            {/* NEW CODE BELOW */}

            <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
                <div className="rounded p-3" style={{ maxWidth: '350px', height: '650px', backgroundColor: 'rgba(0,0,0,0.8)' }}>
                    <img
                        src="/images/smartsensify_logo_white.png"
                        alt="smart_sensify_logo_white"
                        className="img-fluid mb-5"
                    />
                    <div className="mb-5">
                        <input
                            type="text"
                            className={`form-control mb-4 ${!username && 'is-invalid'}`}
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        {(!username && (
                            <div className="invalid-feedback">
                                Please enter a username.
                            </div>
                        ))}

                        <input
                            type="password"
                            className={`form-control mb-4 ${!password && 'is-invalid'}`}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {(!password && (
                            <div className="invalid-feedback">
                                Please enter a password.
                            </div>
                        ))}
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="rememberMe" />
                                <label className="form-check-label" htmlFor="rememberMe">
                                    Remember me
                                </label>
                            </div>
                            <a href="#" className="ml-3 text-light">
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    {loginError && <div style={{ color: 'red' }}>{loginError}</div>}

                    <button className="btn btn-primary mb-3 w-100" onClick={handleLogin}>
                        Login
                    </button>

                    <div className='mb-5'>
                        <p className="text-light">
                            Don't have an account? <a href="#" className="text-light">Create one</a>
                        </p>
                    </div>

                    <p className="text-light text-center">SmartSensify 2024</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
