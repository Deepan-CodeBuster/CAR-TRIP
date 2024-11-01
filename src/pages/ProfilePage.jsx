import React, { useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      setUserData(querySnapshot.docs.map(doc => doc.data())[0]); // assuming a single user
    };
    fetchUserData();
  }, []);

  return userData ? (
    <>
      <div className="p-5 bg-purple-600 text-white">
        <h1 className="text-2xl font-bold text-center">Profile</h1>
      </div>
      <div className="flex justify-center items-center   bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">User Details</h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              <span className="font-semibold text-purple-600">User Name:</span> {userData.userName}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold text-purple-600">Car Name:</span> {userData.carName}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold text-purple-600">Car Number:</span> {userData.carNumber}
            </p>
          </div>
        </div>
      </div>
      <Navbar />
    </>
  ) : null; // No loading message, displays null if no data is loaded
};

export default ProfilePage;
