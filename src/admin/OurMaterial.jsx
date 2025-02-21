import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";

function OurMaterial() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_BASE_URL = "https://du-material.onrender.com/app/v1/du_material";

  console.log("OurMaterial component mounted"); // Check if component mounts

  const fetchMaterials = useCallback(async (token) => {
    console.log("fetchMaterials called with token:", token); // Confirm function runs
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE_URL}/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("API Response:", response.data); // Log full response
      const materialsData = response.data.duMaterials || response.data || [];
      console.log("Processed materials data:", materialsData); // Log processed data
      setMaterials(materialsData);
    } catch (err) {
      console.error("fetchMaterials error:", err); // Log any error
      handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAxiosError = (err) => {
    console.error("Error details:", err.response || err.message); // Detailed error log
    if (err.response?.status === 401) {
      handleLogout();
    } else {
      setError(err.response?.data?.message || "An unexpected error occurred.");
    }
  };

  useEffect(() => {
    console.log("useEffect triggered"); // Confirm useEffect runs
    const token = localStorage.getItem("authToken");
    console.log("Token from localStorage:", token); // Log token value

    if (!token) {
      console.log("No token found, redirecting to login");
      navigate("/login");
      return;
    }

    fetchMaterials(token);
  }, [fetchMaterials, navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this material?")) return;

    const token = localStorage.getItem("authToken");
    console.log("handleDelete token:", token); // Log token for delete
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMaterials((prevMaterials) =>
        prevMaterials.filter((material) => material._id !== id)
      );
      alert("Material deleted successfully!");
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    console.log("Logging out"); // Confirm logout
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const renderLoading = () => (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
    </div>
  );

  const renderError = () => (
    <div className="text-center py-6">
      <p className="text-red-400 mb-2">{error}</p>
      <button
        onClick={handleLogout}
        className="text-yellow-400 underline hover:text-yellow-500 transition-colors duration-200"
      >
        Login Again
      </button>
    </div>
  );

  const renderMaterials = () => {
    console.log("Rendering materials, current state:", materials); // Log before render
    return materials.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {materials.map((material) => (
          <div
            key={material._id}
            className="bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            <p className="text-lg font-semibold text-yellow-300 mb-2">
              📌 Semester: {material.sem || "N/A"}
            </p>
            <p className="text-md text-gray-300 mb-4">
              📖 Subject: {material.subject || "N/A"}
            </p>
            <div className="flex justify-between gap-2">
              <button
                onClick={() => navigate(`/update/${material._id}`)}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
                disabled={loading}
              >
                <FaEdit />
                <span>Update</span>
              </button>
              <button
                onClick={() => handleDelete(material._id)}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-red-700 transition-colors duration-200 disabled:opacity-50"
                disabled={loading}
              >
                <FaTrash />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center text-gray-300 py-6 animate-fade-in">
        No materials found.
      </div>
    );
  };

  return (
    <div className="bg-[#001f3f] min-h-screen text-white py-8">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-yellow-400">
          📚 Our Material
        </h1>
        {loading ? renderLoading() : error ? renderError() : renderMaterials()}
      </div>
    </div>
  );
}

export default OurMaterial;
