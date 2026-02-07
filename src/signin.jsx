import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';

function SignIn({ setUser }) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  console.log("SignIn component - setUser prop:", typeof setUser); 

  const handleSignin = async (e) => {
    e.preventDefault();
    console.log("Form submitted"); 
    
    try {
      const res = await fetch('https://estore-server-3cyl.onrender.com/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Email, Password }),
      });
      const data = await res.json();
      
      if (data.success) {
        const userData = { Email, name: data.name };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        navigate('/itemlist');
        
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert('Signin failed');
    }
  };

  return (
    <div>
    <form className="form" id="signin" onSubmit={handleSignin}>
      <img
        className="logo"
        src="/c.png"
        alt=""
        width="72"
        height="57"
        style={{ borderRadius: '7px' }}
      />

      <h1>
        Please sign in
      </h1>

      <div className="form-signin">
        <input
          type="email"
          className="form-control"
          id="floatingInput"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
          required
        />
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete="off"
          required
        />
        <div className="form-check text-start my-3">
          <input
            className="form-check-input"
            type="checkbox"
            value="remember-me"
            id="checkDefault"
          />
          <label
            className="form-check-label"
            htmlFor="checkDefault"
            style={{
              fontFamily: "'Courier New', Courier, monospace",
              fontWeight: 'bold',
            }}
          >
            Remember me
          </label>
        </div>

        <button
          className="btn"
          type="submit"
        >
          Sign in
        </button>

      </div>
      <br />
      <hr />
      <br />
      <label
        className="form-check-label"
        htmlFor="checkDefault"
        style={{
          fontFamily: "'Courier New', Courier, monospace",
          fontWeight: 'bold',
        }}
      >
        Dont have an Account
      </label>
      <button className="btn" id="signup-page" type="button">
        <Link to="/signup" className="sul">
          Create Account / Sign Up
        </Link>
      </button>
      <br /><br />
      <hr />
      <br />
      <p className="mt-5 mb-3 text-body-secondary">© 2025–2026</p>
    </form>
    </div>
  );
}

export default SignIn;