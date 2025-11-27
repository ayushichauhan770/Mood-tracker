import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://mood-tracker-backend-p4lb.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("userId", data.userId);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      if (error.message && error.message.toLowerCase().includes("invalid")) {
        setError("Invalid email or password");
      } else if (error.message && error.message.toLowerCase().includes("not found")) {
        setError("Account not found. Please sign up first");
      } else if (error.message && error.message.includes("Failed to fetch")) {
        setError("Cannot connect to server");
      } else {
        setError(error.message || "Login failed. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-bg-pattern"></div>

      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">🧠</div>
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to continue your wellness journey</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          {error && (
            <div className="login-error-box">
              <span className="error-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <div className={`input-group ${focusedField === 'email' || email ? 'focused' : ''}`}>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              required
            />
            <label htmlFor="email">Email Address</label>
          </div>

          <div className={`input-group ${focusedField === 'password' || password ? 'focused' : ''}`}>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className="login-options">
            <label className="remember-checkbox">
              <input type="checkbox" />
              <span className="checkmark"></span>
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-link">Forgot password?</a>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <span className="btn-arrow">→</span>
              </>
            )}
          </button>
        </form>

        <div className="login-divider">
          <span>or</span>
        </div>

        <div className="social-login">
          <button className="social-btn google-btn">
            <span className="social-icon">G</span>
            <span>Continue with Google</span>
          </button>
        </div>

        <p className="signup-link">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>Create one</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
