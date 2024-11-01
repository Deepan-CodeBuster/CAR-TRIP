import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"; // Adjust the path as needed
import { PlusCircleIcon, InformationCircleIcon, CalculatorIcon, UserIcon } from "@heroicons/react/outline";

const DashboardPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-white bg-purple-600 p-5 rounded-lg shadow-lg">Car Trip</h1>
      
      {/* Attractive Banner */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-6 rounded-lg mb-6 m-2 shadow-lg text-center">
        <h2 className="text-2xl font-semibold text-white">Welcome to Your Car Trip!</h2>
        <p className="text-white mt-2">Manage your trips, check your mileage, and edit your profile all in one place.</p>
      </div>

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {/* Add Trip Card */}
        <Link to="/addtrip" className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:shadow-2xl hover:-translate-y-1 hover:bg-purple-50">
          <div className="p-6 flex items-center space-x-4">
            <PlusCircleIcon className="h-10 w-10 text-purple-700" />
            <div>
              <h2 className="text-xl font-semibold text-purple-700">Add Trip</h2>
              <p className="text-gray-600 mt-2">Add your new trips details.</p>
            </div>
          </div>
        </Link>



          






        {/* Trip Info Card */}
        <Link to="/tripinfo" className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:shadow-2xl hover:-translate-y-1 hover:bg-purple-50">
          <div className="p-6 flex items-center space-x-4">
            <InformationCircleIcon className="h-10 w-10 text-purple-700" />
            <div>
              <h2 className="text-xl font-semibold text-purple-700">Trip Info</h2>
              <p className="text-gray-600 mt-2">View details of your trips.</p>
            </div>
          </div>
        </Link>

        {/* Mileage Check Card */}
        <Link to="/mileage" className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:shadow-2xl hover:-translate-y-1 hover:bg-purple-50">
          <div className="p-6 flex items-center space-x-4">
            <CalculatorIcon className="h-10 w-10 text-purple-700" />
            <div>
              <h2 className="text-xl font-semibold text-purple-700">Mileage Check</h2>
              <p className="text-gray-600 mt-2">Calculate your vehicle's mileage.</p>
            </div>
          </div>
        </Link>

        {/* Profile Card */}
        <Link to="/profile" className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:shadow-2xl hover:-translate-y-1 hover:bg-purple-50">
          <div className="p-6 flex items-center space-x-4">
            <UserIcon className="h-10 w-10 text-purple-700" />
            <div>
              <h2 className="text-xl font-semibold text-purple-700">Profile</h2>
              <p className="text-gray-600 mt-2">View and edit your profile.</p>
            </div>
          </div>
        </Link>

      </div>
      <Navbar />
    </div>
  );
};

export default DashboardPage;
