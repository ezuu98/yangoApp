import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('main');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const user = JSON.parse(localStorage.getItem('user')) || {};

  const renderTabContent = () => {
    switch (activeTab) {
      case 'main':
        return (
          <div className="tab-content">
            <h2>Main Dashboard</h2>
            <p>Dashboard overview and statistics will be displayed here.</p>
          </div>
        );
      case 'bookings':
        return (
          <div className="tab-content">
            <h2>Bookings</h2>
            <div className="bookings-empty">
              <p>You don't have any active bookings at the moment.</p>
              <p>Start exploring our fleet and make your first reservation!</p>
            </div>
          </div>
        );
      case 'partners':
        return (
          <div className="tab-content">
            <h2>Partners</h2>
            <p>Partner information and details will be displayed here.</p>
          </div>
        );
      default:
        return null;
    }
  };

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

      {/* Tab Navigation */}
      <nav className="tab-navigation">
        <div className="tab-container">
          <button
            className={`tab-button ${activeTab === 'main' ? 'active' : ''}`}
            onClick={() => setActiveTab('main')}
          >
            Main Dashboard
          </button>
          <button
            className={`tab-button ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            Bookings
          </button>
          <button
            className={`tab-button ${activeTab === 'partners' ? 'active' : ''}`}
            onClick={() => setActiveTab('partners')}
          >
            Partners
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-content">
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
