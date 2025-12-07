import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Store user info in localStorage
    localStorage.setItem('user', JSON.stringify({
      email,
      rememberMe
    }));

    // Navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-card">
          {/* Logo Section */}
          <div className="login-header">
            <div className="kazim-logo">
              <svg viewBox="0 0 100 100" className="car-icon">
                <circle cx="30" cy="70" r="12" fill="#FF8C42" />
                <circle cx="70" cy="70" r="12" fill="#FF8C42" />
                <path d="M 20 60 Q 25 40 40 35 L 60 35 Q 75 40 80 60 Z" fill="#1a3a52" strokeWidth="2" stroke="#FF8C42" />
                <rect x="35" y="40" width="30" height="18" fill="#4a9fd8" opacity="0.6" />
              </svg>
            </div>
            <h1 className="kazim-title">Kazim Wheels</h1>
            <p className="kazim-subtitle">Premium Car Rental Service</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="login-form">
            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                id="password"
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="form-footer">
              <label className="remember-checkbox">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>

            {/* Sign In Button */}
            <button type="submit" className="login-button">Sign In</button>
          </form>

          {/* Sign Up Link */}
          <div className="login-footer">
            <p className="signup-text">
              Don't have an account? <a href="#" className="signup-link">Create one</a>
            </p>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="welcome-section">
          <h2>Welcome Back</h2>
          <p>Experience the freedom of premium car rentals. Sign in to manage your reservations, track your bookings, and unlock exclusive offers.</p>
          <ul className="features-list">
            <li>Easy booking management</li>
            <li>24/7 customer support</li>
            <li>Exclusive member deals</li>
            <li>Flexible rental options</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Login;
