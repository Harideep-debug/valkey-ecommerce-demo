import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Account = () => {
    const { user, login, register, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const [regUsername, setRegUsername] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [regError, setRegError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setLoginError('');
        const res = login(loginUsername, loginPassword);
        if (res.success) {
            const from = location.state?.from || '/';
            navigate(from);
        } else {
            setLoginError(res.message);
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setRegError('');
        const res = register(regUsername, regEmail, regPassword);
        if (res.success) {
            const from = location.state?.from || '/';
            navigate(from);
        } else {
            setRegError(res.message);
        }
    };

    if (user) {
        return (
            <section className="account py-80">
                <div className="container container-lg">
                    <div className="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40 text-center">
                        <h6 className="text-xl mb-32">Welcome back, {user.username}!</h6>
                        <div className="flex-align flex-wrap justify-content-center gap-16">
                            <Link to="/checkout" className="btn btn-main py-18 px-40">Proceed to Checkout</Link>
                            <button onClick={logout} className="btn btn-outline-main py-18 px-40">Logout</button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="account py-80">
            <div className="container container-lg">
                <div className="row gy-4">
                    {/* Login Card Start */}
                    <div className="col-xl-6 pe-xl-5">
                        <div className="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40 h-100">
                            <h6 className="text-xl mb-32">Login</h6>
                            {loginError && <div className="alert alert-danger">{loginError}</div>}
                            <form onSubmit={handleLogin}>
                                <div className="mb-24">
                                    <label htmlFor="username" className="text-neutral-900 text-lg mb-8 fw-medium">
                                        Username <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="common-input"
                                        id="username"
                                        placeholder="Username"
                                        value={loginUsername}
                                        onChange={(e) => setLoginUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-24">
                                    <label htmlFor="password" className="text-neutral-900 text-lg mb-8 fw-medium">
                                        Password <span className="text-danger">*</span>
                                    </label>
                                    <div className="position-relative">
                                        <input
                                            type="password"
                                            className="common-input"
                                            id="password"
                                            placeholder="Enter Password"
                                            value={loginPassword}
                                            onChange={(e) => setLoginPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-24 mt-48">
                                    <div className="flex-align gap-48 flex-wrap">
                                        <button type="submit" className="btn btn-main py-18 px-40">Log in</button>
                                        <div className="form-check common-check">
                                            <input className="form-check-input" type="checkbox" id="remember" />
                                            <label className="form-check-label flex-grow-1" htmlFor="remember">Remember me</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-48">
                                    <Link to="#" className="text-danger-600 text-sm fw-semibold hover-text-decoration-underline">Forgot your password?</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* Login Card End */}
                    {/* Register Card Start */}
                    <div className="col-xl-6">
                        <div className="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40 h-100">
                            <h6 className="text-xl mb-32">Register</h6>
                            {regError && <div className="alert alert-danger">{regError}</div>}
                            <form onSubmit={handleRegister}>
                                <div className="mb-24">
                                    <label htmlFor="usernameTwo" className="text-neutral-900 text-lg mb-8 fw-medium">
                                        Username <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="common-input"
                                        id="usernameTwo"
                                        placeholder="Write a username"
                                        value={regUsername}
                                        onChange={(e) => setRegUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-24">
                                    <label htmlFor="emailTwo" className="text-neutral-900 text-lg mb-8 fw-medium">
                                        Email address <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        className="common-input"
                                        id="emailTwo"
                                        placeholder="Enter Email Address"
                                        value={regEmail}
                                        onChange={(e) => setRegEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-24">
                                    <label htmlFor="enter-password" className="text-neutral-900 text-lg mb-8 fw-medium">
                                        Password <span className="text-danger">*</span>
                                    </label>
                                    <div className="position-relative">
                                        <input
                                            type="password"
                                            className="common-input"
                                            id="enter-password"
                                            placeholder="Enter Password"
                                            value={regPassword}
                                            onChange={(e) => setRegPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="my-48">
                                    <p className="text-gray-500">
                                        Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <Link to="#" className="text-main-600 text-decoration-underline">privacy policy</Link>.
                                    </p>
                                </div>
                                <div className="mt-48">
                                    <button type="submit" className="btn btn-main py-18 px-40">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* Register Card End */}
                </div>
            </div>
        </section>
    )
}

export default Account