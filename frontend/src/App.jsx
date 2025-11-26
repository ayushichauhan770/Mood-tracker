import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Welcome from "./pages/Welcome";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PersonalityIntro from "./pages/PersonalityIntro";

// Personality Test Pages
import PersonalityTestPage1 from "./pages/PersonalityTestPage1";
import PersonalityTestPage2 from "./pages/PersonalityTestPage2";
import PersonalityTestPage3 from "./pages/PersonalityTestPage3";
import PersonalityTestPage4 from "./pages/PersonalityTestPage4";
import PersonalityTestPage5 from "./pages/PersonalityTestPage5";
import PersonalityTestPage6 from "./pages/PersonalityTestPage6";
import PersonalityTestPage7 from "./pages/PersonalityTestPage7";
import PersonalityTestPage8 from "./pages/PersonalityTestPage8";
import PersonalityTestPage9 from "./pages/PersonalityTestPage9";
import PersonalityTestPage10 from "./pages/PersonalityTestPage10";
import ZodiacSignPage from "./pages/zodiac/ZodiacSignPage";
import Dashboard from "./pages/Dashboard";
import AIChat from "./components/AIChat";


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Personality Test Intro */}
        <Route path="/personality-intro" element={<PersonalityIntro />} />

        {/* Personality Test Pages */}
        <Route path="/personality-test-page-1" element={<PersonalityTestPage1 />} />
        <Route path="/personality-test-page-2" element={<PersonalityTestPage2 />} />
        <Route path="/personality-test-page-3" element={<PersonalityTestPage3 />} />
        <Route path="/personality-test-page-4" element={<PersonalityTestPage4 />} />
        <Route path="/personality-test-page-5" element={<PersonalityTestPage5 />} />
        <Route path="/personality-test-page-6" element={<PersonalityTestPage6 />} />
        <Route path="/personality-test-page-7" element={<PersonalityTestPage7 />} />
        <Route path="/personality-test-page-8" element={<PersonalityTestPage8 />} />
        <Route path="/personality-test-page-9" element={<PersonalityTestPage9 />} />
        <Route path="/personality-test-page-10" element={<PersonalityTestPage10 />} />
        <Route path="/zodiac" element={<ZodiacSignPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
