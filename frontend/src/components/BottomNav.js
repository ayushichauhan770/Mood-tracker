// src/components/BottomNav.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../pages/PageStyles.css";

const navItems = [
  { name: "Dashboard", icon: "🏠", path: "/dashboard" },
  { name: "Mood", icon: "😊", path: "/mood" },
  { name: "Add", icon: "➕", path: "/addmood" },
  { name: "Tools", icon: "🛠️", path: "/tools" },
  { name: "Community", icon: "👥", path: "/community" },
];

export default function BottomNav(){
  const location = useLocation();
  return (
    <div className="bottom-nav">
      {navItems.map(it => (
        <Link
          key={it.name}
          to={it.path}
          title={it.name}               // tooltip on hover
          className={location.pathname === it.path ? "active-nav" : ""}
        >
          <div className="nav-icon">{it.icon}</div>
          <div className="nav-label">{it.name}</div>
        </Link>
      ))}
    </div>
  );
}
