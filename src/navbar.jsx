import { useNavigate,  Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="app">
      <nav className="navbar">
        <img className="icon" src="/c.png" alt="" />  {/*image public filder mai hai */}
        <div className="nav-brand">E-Store</div>
        <ul className="nav-list">
          <li>
            <Link to="ItemList" ><button className="btn primary"> Items List</button></Link>
          </li>
          <li>
            <Link
              to="/add"><button className="btn primary">+Add New Item</button></Link>
          </li>
        </ul>
      </nav>

    </div>
  );
}

export default Navbar;