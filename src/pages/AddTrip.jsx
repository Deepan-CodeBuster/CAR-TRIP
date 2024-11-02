import React, { useState } from "react";
import { db } from "../config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import Swal from "sweetalert2"; // Import SweetAlert
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "../components/Navbar";

function AddTrip() {
  const [tripData, setTripData] = useState({
    tripName: "",
    date: "",
    startTime: "",
    startLocation: "",
    endLocation: "",
    startKilometer: "",
    endKilometer: "",
    endTime: ""
  });

  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    setTripData({ ...tripData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "trips"), {
        ...tripData,
        startKilometer: parseFloat(tripData.startKilometer),
        endKilometer: tripData.endKilometer ? parseFloat(tripData.endKilometer) : null,
        date: tripData.date,
        startTime: tripData.startTime
      });

       
      Swal.fire({
        icon: "success",
        title: "Trip added successfully!",
        showConfirmButton: true,
        confirmButtonColor: "#6b46c1",  
        timer: 2000
      }).then(() => {
        navigate("/tripinfo"); 
      });
    } catch (error) {
      console.error("Error saving trip:", error);
      Swal.fire({
        icon: "error",
        title: "Error saving trip.",
        text: "Please try again."
      });
    }
  };
  return (
    <div>
      <div className="p-5 bg-purple-600">
        <h1 className="text-white font-bold text-2xl text-center">Add Trip</h1>
      </div>
      <Navbar />
      <div className="m-10">
        <form className="max-w-md mx-auto" onSubmit={handleSave}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="tripName"
              id="trip_name"
              value={tripData.tripName}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="trip_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Trip Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="date"
              name="date"
              id="trip_date"
              value={tripData.date}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              required
            />
            <label
              htmlFor="trip_date"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Trip Date
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="time"
              name="startTime"
              id="start_time"
              value={tripData.startTime}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="start_time"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Start Time
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="startLocation"
              id="start_location"
              value={tripData.startLocation}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="start_location"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Start Location
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="startKilometer"
              id="start_kilometer"
              value={tripData.startKilometer}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="start_kilometer"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Start Kilometer
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="endLocation"
              id="end_location"
              value={tripData.endLocation}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="end_location"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              End Location
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="endKilometer"
              id="end_kilometer"
              value={tripData.endKilometer}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="end_kilometer"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              End Kilometer
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="time"
              name="endTime"
              id="end_time"
              value={tripData.endTime}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="end_time"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              End Time
            </label>
          </div>

          <button
            type="submit"
            
            className="text-white bg-purple-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mt-4 ml-2"
          >
            Submit
          </button>
         
        </form>
        <br /><br /><br /><br /><br /> <br />
      </div>
    </div>
  );
}

export default AddTrip;
