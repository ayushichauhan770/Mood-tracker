import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save user data
      localStorage.setItem("userId", data.userId);

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      // Handle specific errors
      if (error.message && error.message.toLowerCase().includes("invalid")) {
        alert("❌ Invalid email or password.\n\nPlease check your credentials and try again.");
      } else if (error.message && error.message.toLowerCase().includes("not found")) {
        alert("❌ Account not found.\n\nPlease sign up first or check your email.");
      } else if (error.message && error.message.includes("Failed to fetch")) {
        alert("⚠️ Cannot connect to server.\n\nPlease make sure:\n• Backend server is running on port 5000\n• MongoDB is connected");
      } else {
        alert("❌ Login failed: " + (error.message || "Unknown error. Please try again."));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login</h1>

        <form className="login-form" onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="signup-link">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>Create one</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
