import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBars, FaTimes } from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;

    try {
      const response = await axios.get("https://du-material.onrender.com/app/v1/admin/logout", {
        withCredentials: true,
      });

      toast.success(response.data.message || "Logged out successfully!");
      localStorage.removeItem("authToken");
      navigate("/admin/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error in logging out");
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-gray-800 shadow-lg p-6 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out w-64`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-blue-400">Admin Panel</h2>
          <button className="md:hidden text-white" onClick={() => setIsSidebarOpen(false)}>
            <FaTimes size={24} />
          </button>
        </div>
        <nav className="flex flex-col mt-6 space-y-4">
          <Link to="/admin/ourmaterial">
            <button className="w-full py-2 rounded-md transition-all font-medium bg-blue-500 hover:bg-blue-600 text-white shadow-md">
              Our Courses
            </button>
          </Link>
          <Link to="/admin/materialcreate">
            <button className="w-full py-2 rounded-md transition-all font-medium bg-green-500 hover:bg-green-600 text-white shadow-md">
              Create Course
            </button>
          </Link>
          <Link to="/">
            <button className="w-full py-2 rounded-md transition-all font-medium bg-purple-500 hover:bg-purple-600 text-white shadow-md">
              Home
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full py-2 rounded-md transition-all font-medium bg-red-500 hover:bg-red-600 text-white shadow-md"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Menu Button */}
        <div className="p-4 bg-gray-800 md:hidden flex items-center justify-between">
          <button onClick={() => setIsSidebarOpen(true)} className="text-white">
            <FaBars size={24} />
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="bg-gray-700 bg-opacity-80 text-gray-200 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
            <h2 className="text-3xl font-bold text-blue-400 mb-4">Welcome, Admin!</h2>
            <p className="text-gray-300 text-lg">Manage your dashboard.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;