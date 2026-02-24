import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [cities, setCities] = useState([]);
  const [cityName, setCityName] = useState("");

  // 🔹 Fetch Cities
  const fetchCities = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/cities",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCities(res.data);
    } catch (error) {
      console.log("Error fetching cities:", error);
    }
  };

  // 🔹 Add City
  const handleAddCity = async () => {
    if (!cityName) return alert("Please enter city name");

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/cities",
        { cityName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCities([...cities, res.data]);
      setCityName("");
    } catch (error) {
      alert(error.response?.data?.message || "City not found");
    }
  };

  // 🔹 Delete City
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/cities/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCities(cities.filter((city) => city._id !== id));
    } catch (error) {
      console.log("Error deleting city:", error);
    }
  };

  // 🔹 Toggle Favorite
  const handleToggleFavorite = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.patch(
        `http://localhost:5000/api/cities/${id}/favorite`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCities(
        cities.map((city) =>
          city._id === id ? res.data : city
        )
      );
    } catch (error) {
      console.log("Error toggling favorite:", error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 p-6">

      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          🌤 Weather Dashboard
        </h1>

        {/* Add City */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center">
          <input
            type="text"
            placeholder="Enter city name..."
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            className="px-4 py-2 rounded-lg w-full sm:w-72 focus:outline-none focus:ring-2 border focus:ring-white"
          />

          <button
            onClick={handleAddCity}
            className="cursor-pointer bg-white text-indigo-600 font-semibold px-6 py-2 rounded-lg border hover:bg-gray-200 transition"
          >
            Add City
          </button>
        </div>

        {/* Cities Grid */}
        {cities.length === 0 ? (
          <p className="text-white text-center">
            No cities added yet.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((city) => (
              <div
                key={city._id}
                className={`backdrop-blur-lg bg-white/20 text-white p-6 rounded-2xl shadow-xl transition transform hover:scale-105 ${
                  city.isFavorite ? "ring-2 ring-yellow-400" : ""
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">
                    {city.cityName}
                  </h2>
                  {city.isFavorite && <span>⭐</span>}
                </div>

                <p className="text-4xl font-semibold mb-2">
                  {city.temperature}°C
                </p>

                <p className="capitalize mb-1">
                  {city.weather}
                </p>

                <p className="text-sm opacity-80">
                  Humidity: {city.humidity}%
                </p>

                {/* Buttons */}
                <div className="flex justify-between mt-6">
                  <button
                    onClick={() =>
                      handleToggleFavorite(city._id)
                    }
                    className="cursor-pointer bg-yellow-400 text-black px-3 py-1 rounded-lg text-sm hover:bg-yellow-500 transition"
                  >
                    {city.isFavorite
                      ? "Unfavorite"
                      : "Favorite"}
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(city._id)
                    }
                    className="cursor-pointer bg-red-500 px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;