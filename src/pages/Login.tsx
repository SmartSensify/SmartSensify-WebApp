import React, { FormEvent, useState } from 'react';
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
    const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 

        if (!username) {
            setIsUsernameInvalid(true);
        } else {
            setIsUsernameInvalid(false);
        }

        if (!password) {
            setIsPasswordInvalid(true);
        } else {
            setIsPasswordInvalid(false);
        }

        if (!username || !password) return;

        const loadingElements = document.querySelectorAll('.submit-loading');
        loadingElements.forEach((element) => {
            element.classList.remove('visually-hidden');
        });

        try {
            await loginUser({
                identifier: username,
                password: password,
            });

            setLoginError(null);
            navigate('/dashboard');

        } catch (error) {
            loadingElements.forEach((element) => {
                element.classList.add('visually-hidden');
            });
            console.error('Login failed:', error);
            setLoginError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div id="page-login">
            <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
                <div className="rounded p-3" style={{ maxWidth: '350px', height: '650px', backgroundColor: 'rgba(0,0,0,0.8)' }}>
                    <img
                        src="/images/smartsensify_logo_white.png"
                        alt="smart_sensify_logo_white"
                        className="img-fluid mb-5"
                    />
                    <div className="mb-5">
                        <form className="row g-3 needs-validation" id='login-form' onSubmit={handleLogin} noValidate>
                            <input
                                type="text"
                                className={`form-control ${isUsernameInvalid && 'is-invalid'}`}
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            {(isUsernameInvalid && (
                                <div className="invalid-feedback">
                                    Please enter a username.
                                </div>
                            ))}

                            <input
                                type="password"
                                className={`form-control mt-4 ${isPasswordInvalid && 'is-invalid'}`}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {(isPasswordInvalid && (
                                <div className="invalid-feedback">
                                    Please enter a password.
                                </div>
                            ))}
                            <div className="d-flex justify-content-between align-items-center mt-4 mb-2">
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
                        </form>
                    </div>
                    {loginError && <div className="text-danger">{loginError}</div>}

                    <button className="btn btn-primary mb-3 w-100" type="submit" form="login-form">
                        <span className="submit-loading visually-hidden spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Login
                        <span className="submit-loading visually-hidden">...</span>
                        {/* {document.querySelector('.submit-loading.visually-hidden') ? null : 'Login'} */}
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
