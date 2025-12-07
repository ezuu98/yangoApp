import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const user = JSON.parse(localStorage.getItem('user')) || {};

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-logo">
            <svg viewBox="0 0 100 100" className="header-car-icon">
              <circle cx="30" cy="70" r="12" fill="#FF8C42" />
              <circle cx="70" cy="70" r="12" fill="#FF8C42" />
              <path d="M 20 60 Q 25 40 40 35 L 60 35 Q 75 40 80 60 Z" fill="#1a3a52" strokeWidth="2" stroke="#FF8C42" />
              <rect x="35" y="40" width="30" height="18" fill="#4a9fd8" opacity="0.6" />
            </svg>
            <h1 className="header-title">Kazim Wheels</h1>
          </div>
          <div className="header-user">
            <span className="user-greeting">Welcome, {user.email || 'Guest'}</span>
            <button onClick={handleLogout} className="logout-button">Sign Out</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-content">
          {/* Welcome Section */}
          <section className="welcome-card">
            <h2>Welcome to Your Dashboard</h2>
            <p>Manage your car rentals, bookings, and account settings all in one place.</p>
          </section>

          {/* Quick Actions Grid */}
          <section className="quick-actions">
            <h3>Quick Actions</h3>
            <div className="actions-grid">
              <div className="action-card">
                <div className="action-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <h4>New Booking</h4>
                <p>Reserve a car for your next trip</p>
              </div>

              <div className="action-card">
                <div className="action-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h4>My Bookings</h4>
                <p>View and manage your reservations</p>
              </div>

              <div className="action-card">
                <div className="action-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 110 8 4 4 0 010-8z" />
                  </svg>
                </div>
                <h4>Account Settings</h4>
                <p>Update your profile information</p>
              </div>

              <div className="action-card">
                <div className="action-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18.364 5.636l-3.536 3.536m9.172-9.172a2 2 0 00-2.828 0l-9.172 9.172m0 0L9 9m0 0l3.364-3.364m0 0a2 2 0 012.828 0l9.172 9.172" />
                  </svg>
                </div>
                <h4>Support</h4>
                <p>Contact our customer support team</p>
              </div>
            </div>
          </section>

          {/* Current Bookings */}
          <section className="bookings-section">
            <h3>Your Active Bookings</h3>
            <div className="bookings-empty">
              <p>You don't have any active bookings at the moment.</p>
              <p>Start exploring our fleet and make your first reservation!</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
