import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Demo Login Credentials
    if (formData.email === "admin@gmail.com" && formData.password === "12345") {
      navigate("/invoice");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="login-page">
      <div className="overlay"></div>

      <div className="login-card">
        {/* Logo Section */}
        <div className="logo-container">
          <div className="logo">🚚</div>

          <h1 className="company-title">
            ARVI <span>TRANSPORT</span>
          </h1>

          <p className="tagline">Logistics & Transport Management</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <span
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          <div className="options">
            <label>
              <input type="checkbox" /> Remember Me
            </label>

            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit" className="login-btn">
            LOGIN
          </button>

          <div className="footer-text">© 2026 ARVI TRANSPORT</div>
        </form>
      </div>
    </div>
  );
}

export default Login;
