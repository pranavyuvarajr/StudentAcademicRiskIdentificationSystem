import { useState } from "react";
import "./DesktopLogin.css";

export default function DesktopLogin() {
  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", data);
    // backend call here
  };

  return (
    <div className="desktop-login">
      {/* LEFT PANEL */}
      <div className="brand-panel">
        <h1>LEGENDARY APP</h1>
        <p>Secure. Fast. Powerful.</p>
      </div>

      {/* RIGHT PANEL */}
      <div className="login-panel">
        <div className="login-box">
          <h2>Sign In</h2>
          <p className="subtitle">Access your dashboard</p>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <input
                type="text"
                name="username"
                required
                onChange={handleChange}
              />
              <label>Username</label>
            </div>

            <div className="field">
              <input
                type="password"
                name="password"
                required
                onChange={handleChange}
              />
              <label>Password</label>
            </div>

            <div className="options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#">Forgot?</a>
            </div>

            <button>LOGIN</button>
          </form>
        </div>
      </div>
    </div>
  );
}