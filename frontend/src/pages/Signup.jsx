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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();


    // Basic validation (you can add API later)
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    // Store to localStorage temporarily (you can replace with backend later)
    localStorage.setItem("user-signup", JSON.stringify(form));

    navigate("/personality-intro"); // Next page
  };

  return (

    <div className="signup-wrap">
      <form className="signup-card" onSubmit={handleNext}>
        <h2 className="signup-title">Create Your Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="signup-input"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="signup-input"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="signup-input"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit" className="signup-btn">
          Next
        </button>
      </form>

    </div>
  );
}
