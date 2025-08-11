import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Home from "./pages/Home";
import Admin from "./components/Admin";
import EventAdmin from "./components/EventAdmin";
import ArticleAdmin from "./components/ArticleAdmin";
import LoginPage from "./pages/LoginPage";

import { ScrollProvider } from "./components/ScrollContext";
import PrivateRoute from "./components/PrivateRoute"; // ✅ import
import WelcomePage from "./pages/WelcomePage";
import "./App.css";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="font-sans">
      <ScrollProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/admin-login" element={<LoginPage />} />

            {/* ✅ Protected Admin Routes */}
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <Admin />
                </PrivateRoute>
              }
            />
            <Route
              path="/event-admin"
              element={
                <PrivateRoute>
                  <EventAdmin />
                </PrivateRoute>
              }
            />
            <Route
              path="/article-admin"
              element={
                <PrivateRoute>
                  <ArticleAdmin />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </ScrollProvider>
    </div>
  );
}

export default App;
