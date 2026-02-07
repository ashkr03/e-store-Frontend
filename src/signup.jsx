import { useState } from "react";
import { Link } from 'react-router-dom';

function Signup() {

    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('https://estore-server-3cyl.onrender.com/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Name, Email, Password }),
            });
            const data = await res.json();
            if (data.success) {
                alert(data.message); 
                // Redirect to signin page
                window.location.href = '/signin';
            } else {
                alert(data.error);
            }
        } catch (err) {
            alert('Error creating account');
        }
    };

    return (
        <form className="form" id="signup" onSubmit={handleSignup}>
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

            <div className="form-signup">
                <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Your Name"
                    required
                />

                <input
                    type="text"
                    className="form-control"
                    id="upemail"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Email"
                    required
                />

                <input
                    type="password"
                    className="form-control"
                    autoComplete="off"
                    id="floatingPassword"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Your Password"
                    required
                />

                <br />
                <button
                    className="btn"
                    type="submit" >SignUp</button>

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
                Already have an Account
            </label>
            <button className="btn" id="signin-page" type="click"><Link to="/signin" className="sil"> Sign In</Link>
            </button>
            <br /><br />
            <hr />
            <br />
            <p className="mt-5 mb-3 text-body-secondary">© 2025–2026</p>
        </form>
    );
}

export default Signup;
