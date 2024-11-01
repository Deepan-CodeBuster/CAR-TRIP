import { db } from "../config/firebaseConfig";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa"; // Import edit and trash icons
import Navbar from "../components/Navbar";


const Tripinfo = () => {
  const [trips, setTrips] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTrip, setCurrentTrip] = useState(null);

  // Function to fetch trips from Firestore
  useEffect(() => {
    const fetchTrips = async () => {
      const querySnapshot = await getDocs(collection(db, "trips"));
      setTrips(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchTrips();
  }, []);

  // Function to delete a trip by ID
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "trips", id));
      setTrips(trips.filter(trip => trip.id !== id));
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };

  // Function to handle edit
  const handleEditClick = (trip) => {
    setIsEditing(true);
    setCurrentTrip(trip);
  };

  // Function to update trip details
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "trips", currentTrip.id), {
        tripName: currentTrip.tripName,
        startLocation: currentTrip.startLocation,
        endLocation: currentTrip.endLocation,
        startKilometer: currentTrip.startKilometer,
        endKilometer: currentTrip.endKilometer,
      });
      setTrips(trips.map(trip => (trip.id === currentTrip.id ? currentTrip : trip)));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating trip:", error);
    }
  };

  return (
    <>
    <Navbar />
      <div className="p-5 bg-purple-600">
        <h1 className="text-white font-bold text-2xl">Trip Info</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
        {trips.map((trip) => (
          <div key={trip.id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200 relative">
            <div>
              <h2 className="font-bold text-lg mb-2 text-purple-700">Trip Name: {trip.tripName}</h2>
              <p className="text-gray-600">Date: {trip.date}</p>
              <p className="text-gray-600">Start Location: {trip.startLocation} | Time : {trip.startTime}</p>
              <p className="text-gray-600">End Location: {trip.endLocation} | Time : {trip.endTime}</p>
              <p className="text-gray-600 font-semibold">Total Km: {trip.endKilometer - trip.startKilometer}</p>
            </div>
            <div className="absolute top-3 right-3 flex space-x-2">
              <button onClick={() => handleEditClick(trip)} className="text-blue-500">
                <FaEdit size={20} />
              </button>
              <button onClick={() => handleDelete(trip.id)} className="text-red-500">
                <FaTrash size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isEditing && currentTrip && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <form onSubmit={handleUpdate} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
            <h2 className="text-lg font-bold text-gray-700">Edit Trip</h2>
            <label className="block">
              Trip Name:
              <input
                type="text"
                value={currentTrip.tripName}
                onChange={(e) => setCurrentTrip({ ...currentTrip, tripName: e.target.value })}
                className="block w-full p-2 border border-gray-300 rounded mt-1"
              />
            </label>
            <label className="block">
              Start Location:
              <input
                type="text"
                value={currentTrip.startLocation}
                onChange={(e) => setCurrentTrip({ ...currentTrip, startLocation: e.target.value })}
                className="block w-full p-2 border border-gray-300 rounded mt-1"
              />
            </label>
            <label className="block">
              End Location:
              <input
                type="text"
                value={currentTrip.endLocation}
                onChange={(e) => setCurrentTrip({ ...currentTrip, endLocation: e.target.value })}
                className="block w-full p-2 border border-gray-300 rounded mt-1"
              />
            </label>
            <label className="block">
              Start Kilometer:
              <input
                type="number"
                value={currentTrip.startKilometer}
                onChange={(e) => setCurrentTrip({ ...currentTrip, startKilometer: e.target.value })}
                className="block w-full p-2 border border-gray-300 rounded mt-1"
              />
            </label>
            <label className="block">
              End Kilometer:
              <input
                type="number"
                value={currentTrip.endKilometer}
                onChange={(e) => setCurrentTrip({ ...currentTrip, endKilometer: e.target.value })}
                className="block w-full p-2 border border-gray-300 rounded mt-1"
              />
            </label>
            <label className="block">
              End Time:
              <input
                type="time"
                value={currentTrip.endTime}
                onChange={(e) => setCurrentTrip({ ...currentTrip, endTime: e.target.value })}
                className="block w-full p-2 border border-gray-300 rounded mt-1"
              />
            </label>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Tripinfo;
