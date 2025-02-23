import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      const response = await axios.get(`${API_BASE_URL}/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Fetched Materials:", response.data.duMaterials);
      setMaterials(response.data.duMaterials || []);
    } catch (err) {
      console.error("Error fetching materials:", err);

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
      console.error("Error deleting material:", err);

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Our Material</h1>

      {loading ? (
        <div className="text-center text-gray-600 py-4">Loading materials...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-4">
          {error} <br />
          <button onClick={handleLogout} className="text-blue-500 underline">
            Login Again
          </button>
        </div>
      ) : materials.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Semester</th>
                <th className="border p-2">Subject</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material) => (
                <tr key={material._id} className="border">
                  <td className="border p-2">{material.sem || "N/A"}</td>
                  <td className="border p-2">{material.subject || "N/A"}</td>
                  <td className="border p-2">{material.title || material.note_name || "N/A"}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => navigate(`/update/${material._id}`)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600 transition"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(material._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-600 py-4">No materials found.</div>
      )}
    </div>
  );
}

export default OurMaterial;
