import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "password") {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const handleNext = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    if (passwordStrength < 2) {
      alert("Please use a stronger password");
      return;
    }

    localStorage.setItem("user-signup", JSON.stringify(form));
    navigate("/personality-intro");
  };

  return (
    <div className="signup-wrap">
      <div className="signup-container">
        <h2 className="signup-title">Create Account</h2>
        <p className="signup-desc">Join thousands tracking their wellness</p>

        <form className="signup-form" onSubmit={handleNext}>
          <div className={`input-group ${focusedField === 'name' || form.name ? 'focused' : ''}`}>
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              required
            />
            <label htmlFor="name">Full Name</label>
          </div>

          <div className={`input-group ${focusedField === 'email' || form.email ? 'focused' : ''}`}>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              required
            />
            <label htmlFor="email">Email Address</label>
          </div>

          <div className={`input-group ${focusedField === 'password' || form.password ? 'focused' : ''}`}>
            <input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              required
            />
            <label htmlFor="password">Password</label>

            {form.password && (
              <div className="password-strength">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`strength-bar ${i < passwordStrength ? 'active' : ''} ${passwordStrength <= 2 ? 'weak' : passwordStrength === 3 ? 'medium' : 'strong'
                      }`}
                  ></div>
                ))}
              </div>
            )}
          </div>

          <button type="submit" className="signup-submit-btn">
            Continue
          </button>
        </form>

        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Sign in</span>
        </p>
      </div>
    </div>
  );
}
