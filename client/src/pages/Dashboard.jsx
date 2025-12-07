import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('main');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookings, setBookings] = useState([
    {
      id: 1,
      customer: 'Ali Ahmed',
      contact: '0712345678',
      cnic: '12345-1234567-1',
      reference: 'REF-001',
      driver: 'Ahmed Hassan',
      vehicle: 'KW-001',
      fare: 2500,
      date: '2024-01-10',
      status: 'Completed'
    },
    {
      id: 2,
      customer: 'Fatima Khan',
      contact: '0787654321',
      cnic: '12346-1234568-2',
      reference: 'REF-002',
      driver: 'Fatima Ali',
      vehicle: 'KW-002',
      fare: 3000,
      date: '2024-01-12',
      status: 'Completed'
    },
    {
      id: 3,
      customer: 'Mohammed Ali',
      contact: '0722222222',
      cnic: '12347-1234569-3',
      reference: 'REF-003',
      driver: 'Mohammed Karim',
      vehicle: 'KW-003',
      fare: 2800,
      date: '2024-01-14',
      status: 'Confirmed'
    },
    {
      id: 4,
      customer: 'Amina Hassan',
      contact: '0733333333',
      cnic: '12348-1234570-4',
      reference: 'REF-004',
      driver: 'Amina Ibrahim',
      vehicle: 'KW-004',
      fare: 2300,
      date: '2024-01-16',
      status: 'Pending'
    }
  ]);
  const [newBooking, setNewBooking] = useState({
    customer: '',
    contact: '',
    cnic: '',
    reference: '',
    driver: '',
    vehicle: '',
    fare: '',
    date: ''
  });
  const dropdownRef = useRef(null);
  const datePickerRef = useRef(null);
  const today = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [tempStartDate, setTempStartDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setIsDatePickerOpen(false);
      }
    }

    if (isDatePickerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isDatePickerOpen]);

  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [isDarkMode]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleSettings = () => {
    setIsDropdownOpen(false);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleAddBooking = () => {
    if (newBooking.customer && newBooking.contact && newBooking.cnic && newBooking.reference && newBooking.driver && newBooking.vehicle && newBooking.fare && newBooking.date) {
      const booking = {
        id: bookings.length + 1,
        customer: newBooking.customer,
        contact: newBooking.contact,
        cnic: newBooking.cnic,
        reference: newBooking.reference,
        driver: newBooking.driver,
        vehicle: newBooking.vehicle,
        fare: parseFloat(newBooking.fare),
        date: newBooking.date,
        status: 'Pending'
      };
      setBookings([booking, ...bookings]);
      setNewBooking({ customer: '', contact: '', cnic: '', reference: '', driver: '', vehicle: '', fare: '', date: '' });
      setIsBookingModalOpen(false);
    }
  };

  const handleCancelBooking = (bookingId) => {
    setBookings(bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: 'Cancelled' } : booking
    ));
  };

  const formatDateToString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateSelect = (date) => {
    const dateStr = formatDateToString(date);
    if (tempStartDate === null) {
      setTempStartDate(dateStr);
    } else {
      const start = new Date(tempStartDate);
      const end = new Date(dateStr);
      if (end >= start) {
        setStartDate(tempStartDate);
        setEndDate(dateStr);
        setTempStartDate(null);
        setIsDatePickerOpen(false);
      } else {
        setStartDate(dateStr);
        setEndDate(tempStartDate);
        setTempStartDate(null);
        setIsDatePickerOpen(false);
      }
    }
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatMonth = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
    }

    return days;
  };

  const isDateInRange = (date) => {
    if (!date) return false;
    const dateStr = formatDateToString(date);
    return dateStr >= startDate && dateStr <= endDate;
  };

  const isDateSelected = (date) => {
    if (!date) return false;
    const dateStr = formatDateToString(date);
    return dateStr === startDate || dateStr === endDate || dateStr === tempStartDate;
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
                <div key={index} className={`status-card card-${card.label.toLowerCase()}`}>
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
                <div className="date-picker-dropdown" ref={datePickerRef}>
                  <button
                    onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                    className="date-picker-trigger"
                  >
                    📅 {startDate} to {endDate}
                  </button>
                  {isDatePickerOpen && (
                    <div className="calendar-popup">
                      <div className="calendar-header">
                        <button
                          className="calendar-nav"
                          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                        >
                          ← Prev
                        </button>
                        <span className="calendar-month">{formatMonth(currentMonth)}</span>
                        <button
                          className="calendar-nav"
                          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                        >
                          Next →
                        </button>
                      </div>
                      <div className="calendar-weekdays">
                        <div className="weekday">Sun</div>
                        <div className="weekday">Mon</div>
                        <div className="weekday">Tue</div>
                        <div className="weekday">Wed</div>
                        <div className="weekday">Thu</div>
                        <div className="weekday">Fri</div>
                        <div className="weekday">Sat</div>
                      </div>
                      <div className="calendar-days">
                        {generateCalendarDays().map((date, index) => (
                          <button
                            key={index}
                            className={`calendar-day ${date ? '' : 'empty'} ${date && isDateSelected(date) ? 'selected' : ''} ${date && isDateInRange(date) ? 'in-range' : ''}`}
                            onClick={() => date && handleDateSelect(date)}
                            disabled={!date}
                          >
                            {date ? date.getDate() : ''}
                          </button>
                        ))}
                      </div>
                      <div className="calendar-info">
                        {tempStartDate && <p>Start: {tempStartDate} - Select end date</p>}
                        {!tempStartDate && startDate && endDate && <p>Selected: {startDate} to {endDate}</p>}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Vehicles Table */}
              <div className="table-wrapper">
                <table className="vehicles-table">
                  <thead>
                    <tr>
                      <th>Vehicle</th>
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
            <div className="bookings-header">
              <h2>Bookings</h2>
              <button className="add-booking-btn" onClick={() => setIsBookingModalOpen(true)}>
                ➕ Add Booking
              </button>
            </div>

            {isBookingModalOpen && (
              <div className="modal-overlay" onClick={() => setIsBookingModalOpen(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h3>Add New Booking</h3>
                    <button className="modal-close" onClick={() => setIsBookingModalOpen(false)}>✕</button>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label>Customer Name</label>
                      <input
                        type="text"
                        placeholder="Enter customer name"
                        value={newBooking.customer}
                        onChange={(e) => setNewBooking({ ...newBooking, customer: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Contact</label>
                      <input
                        type="tel"
                        placeholder="Enter phone number"
                        value={newBooking.contact}
                        onChange={(e) => setNewBooking({ ...newBooking, contact: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>CNIC</label>
                      <input
                        type="text"
                        placeholder="Enter CNIC number"
                        value={newBooking.cnic}
                        onChange={(e) => setNewBooking({ ...newBooking, cnic: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Reference</label>
                      <input
                        type="text"
                        placeholder="Enter reference number"
                        value={newBooking.reference}
                        onChange={(e) => setNewBooking({ ...newBooking, reference: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Driver</label>
                      <select
                        value={newBooking.driver}
                        onChange={(e) => setNewBooking({ ...newBooking, driver: e.target.value })}
                      >
                        <option value="">Select a driver</option>
                        <option value="Ahmed Hassan">Ahmed Hassan</option>
                        <option value="Fatima Ali">Fatima Ali</option>
                        <option value="Mohammed Karim">Mohammed Karim</option>
                        <option value="Amina Ibrahim">Amina Ibrahim</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Vehicle</label>
                      <select
                        value={newBooking.vehicle}
                        onChange={(e) => setNewBooking({ ...newBooking, vehicle: e.target.value })}
                      >
                        <option value="">Select a vehicle</option>
                        <option value="KW-001">KW-001</option>
                        <option value="KW-002">KW-002</option>
                        <option value="KW-003">KW-003</option>
                        <option value="KW-004">KW-004</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Fare</label>
                      <input
                        type="number"
                        placeholder="Enter booking fare"
                        value={newBooking.fare}
                        onChange={(e) => setNewBooking({ ...newBooking, fare: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Date</label>
                      <input
                        type="date"
                        value={newBooking.date}
                        onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button className="btn-cancel" onClick={() => setIsBookingModalOpen(false)}>Cancel</button>
                    <button className="btn-submit" onClick={handleAddBooking}>Add Booking</button>
                  </div>
                </div>
              </div>
            )}

            <div className="bookings-section">
              <h3>Booking History</h3>
              <div className="table-wrapper">
                <table className="bookings-table">
                  <thead>
                    <tr>
                      <th>Vehicle</th>
                      <th>Customer</th>
                      <th>Contact</th>
                      <th>CNIC</th>
                      <th>Reference</th>
                      <th>Driver</th>
                      <th>Fare</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.length > 0 ? (
                      bookings.map((booking) => (
                        <tr key={booking.id}>
                          <td>{booking.vehicle}</td>
                          <td>{booking.customer}</td>
                          <td>{booking.contact}</td>
                          <td>{booking.cnic}</td>
                          <td>{booking.reference}</td>
                          <td>{booking.driver}</td>
                          <td className="currency">{booking.fare.toLocaleString()}</td>
                          <td>{booking.date}</td>
                          <td><span className={`booking-status status-${booking.status.toLowerCase()}`}>{booking.status}</span></td>
                          <td>
                            {booking.status !== 'Cancelled' && booking.status !== 'Completed' && (
                              <button
                                className="action-btn-cancel"
                                onClick={() => handleCancelBooking(booking.id)}
                              >
                                Cancel
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="10" className="no-data">No bookings found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
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
            <div className="dropdown-container" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="dropdown-toggle"
                aria-label="User menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-theme-section">
                    <span className="theme-section-label">Theme</span>
                    <label className="theme-switch">
                      <input
                        type="checkbox"
                        checked={isDarkMode}
                        onChange={handleThemeToggle}
                        aria-label="Toggle dark mode"
                      />
                      <span className="theme-slider"></span>
                    </label>
                    <span className="theme-label">{isDarkMode ? '🌙 Dark' : '☀️ Light'}</span>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item" onClick={handleSettings}>
                    ⚙️ Settings
                  </button>
                  <button className="dropdown-item" onClick={handleLogout}>
                    🚪 Sign Out
                  </button>
                </div>
              )}
            </div>
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
