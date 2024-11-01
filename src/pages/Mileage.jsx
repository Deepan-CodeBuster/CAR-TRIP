import React, { useState, useEffect } from "react";
import { db } from "../config/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import Navbar from "../components/Navbar";

function Mileage() {
  const [firstFuelKm, setFirstFuelKm] = useState("");
  const [secondFuelKm, setSecondFuelKm] = useState("");
  const [fuelLiters, setFuelLiters] = useState("");
  const [mileage, setMileage] = useState(null);
  const [mileageEntries, setMileageEntries] = useState([]);

  const handleCalculateMileage = async (e) => {
    e.preventDefault();
    if (firstFuelKm && secondFuelKm && fuelLiters) {
      const calculatedMileage = ((secondFuelKm - firstFuelKm) / fuelLiters).toFixed(2);
      setMileage(calculatedMileage);

      // Save to Firebase
      try {
        const docRef = await addDoc(collection(db, "mileageRecords"), {
          mileage: calculatedMileage,
          date: new Date().toLocaleDateString(),
        });
        console.log("Mileage entry added with ID: ", docRef.id);
        fetchMileageEntries(); // Refresh entries
      } catch (error) {
        console.error("Error adding mileage entry: ", error);
      }
    }
  };

  const fetchMileageEntries = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "mileageRecords"));
      const entries = querySnapshot.docs.map((doc) => doc.data());
      setMileageEntries(entries);
    } catch (error) {
      console.error("Error fetching mileage entries: ", error);
    }
  };

  useEffect(() => {
    fetchMileageEntries();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-5 bg-purple-600">
        <h1 className="text-white font-bold text-2xl text-center">
          Mileage Check
        </h1>
      </div>
      <div className="m-10">
        <form onSubmit={handleCalculateMileage} className="max-w-md mx-auto">
          {/* First Fuel Kilometer Input */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="firstFuelKm"
              value={firstFuelKm}
              onChange={(e) => setFirstFuelKm(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
              required
            />
            <label className="absolute text-sm text-gray-500 transition-all duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-purple-600">
              First Fuel Kilometer
            </label>
          </div>

          {/* Second Fuel Kilometer Input */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="secondFuelKm"
              value={secondFuelKm}
              onChange={(e) => setSecondFuelKm(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
              required
            />
            <label className="absolute text-sm text-gray-500 transition-all duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-purple-600">
              Second Fuel Kilometer
            </label>
          </div>

          {/* Fuel Liters Input */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="fuelLiters"
              value={fuelLiters}
              onChange={(e) => setFuelLiters(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
              required
            />
            <label className="absolute text-sm text-gray-500 transition-all duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-purple-600">
              Current Liters in Second Fuel
            </label>
          </div>

          <button
            type="submit"
            className="text-white bg-purple-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mt-4"
          >
            Calculate Mileage
          </button>
        </form>

        {/* Display Mileage Result */}
        {mileage && (
          <div className="mt-8 text-center">
            <p className="text-lg font-semibold text-purple-700">
              Total Mileage: <span className="text-gray-800">{mileage} km/l</span>
            </p>
          </div>
        )}

        {/* Display Mileage Records Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mileageEntries.map((entry, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-5">
              <h3 className="text-purple-700 font-semibold text-lg">Mileage: {entry.mileage} km/l</h3>
              <p className="text-gray-600">Date: {entry.date}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Mileage;
