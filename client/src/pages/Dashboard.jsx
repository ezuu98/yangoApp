import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('main');
  const [dateFilter, setDateFilter] = useState(new Date().toISOString().split('T')[0]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const user = JSON.parse(localStorage.getItem('user')) || {};

  const vehiclesData = [
    {
      id: 1,
      plateNo: 'KW-001',
      driver: 'Ahmed Hassan',
      contact: '0712345678',
      earning: 2500,
      fuelCost: 450,
      salary: 1200,
      maintenance: 100,
      rent: 500,
      profit: 250,
      bonus: 0,
      status: 'Active'
    },
    {
      id: 2,
      plateNo: 'KW-002',
      driver: 'Fatima Ali',
      contact: '0787654321',
      earning: 3000,
      fuelCost: 520,
      salary: 1200,
      maintenance: 150,
      rent: 500,
      profit: 630,
      bonus: 50,
      status: 'Active'
    },
    {
      id: 3,
      plateNo: 'KW-003',
      driver: 'Mohammed Karim',
      contact: '0722222222',
      earning: 2800,
      fuelCost: 480,
      salary: 1200,
      maintenance: 200,
      rent: 500,
      profit: 420,
      bonus: 25,
      status: 'Maintenance'
    },
    {
      id: 4,
      plateNo: 'KW-004',
      driver: 'Amina Ibrahim',
      contact: '0733333333',
      earning: 2300,
      fuelCost: 400,
      salary: 1200,
      maintenance: 80,
      rent: 500,
      profit: 120,
      bonus: 0,
      status: 'Stationed'
    }
  ];

  const statusCards = [
    { label: 'Active', value: 15, icon: '🟢' },
    { label: 'Stationed', value: 8, icon: '🔵' },
    { label: 'Maintenance', value: 3, icon: '🔧' },
    { label: 'Emergency', value: 1, icon: '⚠️' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'main':
        return (
          <div className="tab-content">
            <h2>Main Dashboard</h2>

            {/* Status Cards */}
            <div className="status-cards-grid">
              {statusCards.map((card, index) => (
                <div key={index} className="status-card">
                  <div className="status-icon">{card.icon}</div>
                  <div className="status-info">
                    <p className="status-label">{card.label}</p>
                    <p className="status-value">{card.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Date Filter and Table */}
            <div className="vehicles-section">
              <div className="filter-container">
                <label htmlFor="dateFilter" className="filter-label">Filter by Date:</label>
                <input
                  id="dateFilter"
                  type="date"
                  className="date-filter-input"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </div>

              {/* Vehicles Table */}
              <div className="table-wrapper">
                <table className="vehicles-table">
                  <thead>
                    <tr>
                      <th>Plate No</th>
                      <th>Driver</th>
                      <th>Contact</th>
                      <th>Earning</th>
                      <th>Fuel Cost</th>
                      <th>Salary</th>
                      <th>Maintenance</th>
                      <th>Rent</th>
                      <th>Profit</th>
                      <th>Bonus Recovery</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehiclesData.map((vehicle) => (
                      <tr key={vehicle.id}>
                        <td>{vehicle.plateNo}</td>
                        <td>{vehicle.driver}</td>
                        <td>{vehicle.contact}</td>
                        <td className="currency">{vehicle.earning.toLocaleString()}</td>
                        <td className="currency">{vehicle.fuelCost.toLocaleString()}</td>
                        <td className="currency">{vehicle.salary.toLocaleString()}</td>
                        <td className="currency">{vehicle.maintenance.toLocaleString()}</td>
                        <td className="currency">{vehicle.rent.toLocaleString()}</td>
                        <td className="currency profit">{vehicle.profit.toLocaleString()}</td>
                        <td className="currency">{vehicle.bonus.toLocaleString()}</td>
                        <td><span className={`status-badge status-${vehicle.status.toLowerCase()}`}>{vehicle.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
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
