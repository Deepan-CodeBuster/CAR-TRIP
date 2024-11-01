import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import RegistrationForm from "./pages/RegistrationForm";
import AddTrip from "./pages/AddTrip";
import Profile from "./pages/ProfilePage";
import Tripinfo from "./pages/TripInfo";
import Mileage from "./pages/Mileage";

const App = () => {
  const isRegistered = localStorage.getItem("isRegistered");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={!isRegistered ? <Navigate to="/register" /> : <Navigate to="/home" />}
        />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tripinfo" element={<Tripinfo />} />
        <Route path="/addtrip" element={<AddTrip />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/mileage" element={<Mileage />} />
        
      </Routes>
    </Router>
  );
};

export default App;
