import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";

function OurMaterial() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_BASE_URL = "https://du-material.onrender.com/app/v1/du_material";

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchMaterials(token);
  }, []);

  const fetchMaterials = async (token) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE_URL}/getSignedUrl`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMaterials(response.data.duMaterials || []);
    } catch (err) {
      if (err.response?.status === 401) {
        handleLogout();
      } else {
        setError(err.response?.data?.message || "Failed to load materials.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this material?")) return;

    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMaterials((prevMaterials) => prevMaterials.filter((material) => material._id !== id));
      alert("Material deleted successfully!");
    } catch (err) {
      if (err.response?.status === 401) {
        handleLogout();
      } else {
        setError(err.response?.data?.message || "Failed to delete material.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="bg-[#001f3f] min-h-screen text-white py-8">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-yellow-400">📚 Our Material</h1>

        {loading ? (
          <div className="text-center text-gray-300 py-6 animate-pulse">Loading materials...</div>
        ) : error ? (
          <div className="text-center text-red-400 py-6">
            {error} <br />
            <button onClick={handleLogout} className="text-yellow-400 underline hover:text-yellow-500 transition">
              Login Again
            </button>
          </div>
        ) : materials.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {materials.map((material) => (
              <div key={material._id} className="bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition">
                <p className="text-lg font-semibold text-yellow-300">📌 Semester: {material.sem || "N/A"}</p>
                <p className="text-md text-gray-300">📖 Subject: {material.subject || "N/A"}</p>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => navigate(`/update/${material._id}`)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-700 transition"
                  >
                    <FaEdit />
                    <span>Update</span>
                  </button>

                  <button
                    onClick={() => handleDelete(material._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-red-700 transition"
                  >
                    <FaTrash />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-300 py-6">No materials found.</div>
        )}
      </div>
    </div>
  );
}

export default OurMaterial;
