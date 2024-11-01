import React, { useState } from "react";
import { db } from "../config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [userData, setUserData] = useState({ userName: "", carName: "", carNumber: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "users"), userData);
      localStorage.setItem("isRegistered", true);
      navigate("/home");  // Redirect to Home Page after registration
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <>
     <div className="p-5 bg-purple-600 text-white">
        <h1 className="text-2xl font-bold text-center">Register</h1>
      </div>
    <div className="mt-40 flex items-center justify-center bg-gray-100 m-4 border-gray-400  shadow-black shadow-2xl">
      
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-purple-600 text-center">Register</h2>

        <input 
          type="text" 
          name="userName" 
          placeholder="User Name" 
          onChange={handleChange} 
          required 
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input 
          type="text" 
          name="carName" 
          placeholder="Car Name" 
          onChange={handleChange} 
          required 
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input 
          type="text" 
          name="carNumber" 
          placeholder="Car Number" 
          onChange={handleChange} 
          required 
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button 
          type="submit" 
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-md transition duration-300"
        >
          Register
        </button>
      </form>
    </div>
    </>
  );
};

export default RegistrationForm;
