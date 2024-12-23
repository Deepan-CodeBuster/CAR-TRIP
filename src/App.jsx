import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import AddTrip from "./pages/AddTrip";
import Profile from "./pages/ProfilePage";
import Tripinfo from "./pages/TripInfo";
import Mileage from "./pages/Mileage";

const App = () => {
  const isRegistered = localStorage.getItem("isRegistered");

  return (
    <Router>
      <Routes>
         
        <Route path="/" element={<Home/>} />
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
