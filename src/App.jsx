import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SignIn from './signin.jsx';
import Signup from './signup.jsx';
import ItemList from './ItemList.jsx';
import AddItem from './AddItem.jsx';
import EditItem from './EditItem.jsx';
import './index.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) setUser(JSON.parse(user));
  }, []);

  const logout = () => {
    if (window.confirm('Do you want to Logout')) {
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/signin" />;
  };

  const AuthNavbar = () => (
    <nav className="navbar">
      <img className="icon" src="c.png" alt="logo" />
      <div className="nav-brand">E-Store</div>
    </nav>
  );

  const DashboardNavbar = () => (
    <nav className="navbar">
      <img className="icon" src="c.png" alt="logo" />
      <div className="nav-brand">E-Store Dashboard</div>
      <div className="nav-list">
        <button className="btn-primary"><Link className="btn-primary" to="/itemlist">Items List</Link></button>
        <button className="btn-primary"><Link className="btn-primary" to="/add">Add New Item</Link></button>
        <button className="btn-primary" onClick={logout}>Logout</button>
      </div>
    </nav>
  );

  return (
    <Router>
      <div className="app">
        {user ? <DashboardNavbar /> : <AuthNavbar />}
        <Routes>
          <Route path="/signin" element={!user ? <SignIn setUser={setUser} /> : <Navigate to="/itemlist" />} />
          <Route path="/signup" element={!user ? <Signup setUser={setUser} /> : <Navigate to="/itemlist" />} />
          <Route path="/" element={user ? <Navigate to="/itemlist" /> : <Navigate to="/signin" />} />
          <Route path="/itemlist" element={<ProtectedRoute><ItemList /></ProtectedRoute>} />
          <Route path="/add" element={<ProtectedRoute><AddItem /></ProtectedRoute>} />
          <Route path="/edit/:id" element={<ProtectedRoute><EditItem /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
