import React, { useState } from "react";
import axios from "axios";
import "../components/Signup.css"; // Create this CSS file for styling
import { useNavigate } from "react-router-dom";

function AdminSignup() {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Hook for navigation
  const [errorMessage, setErrorMessage] = useState(""); // To show error message
  const [successMessage, setSuccessMessage] = useState(""); // To show success message

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    console.log("Form Data Submitted:", formData);

    if (
      !formData.FirstName ||
      !formData.LastName ||
      !formData.email ||
      !formData.password
    ) {
      setErrorMessage("Please fill in all the fields.");
      return;
    }

    try {
      const response = await axios.post(
        "https://du-material.onrender.com/app/v1/admin/signup", // Ensure this is the correct URL for your backend
        {
          FirstName: formData.FirstName,
          LastName: formData.LastName,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Signup successful:", response.data);
      setSuccessMessage(response.data.message || "Signup successful! Redirecting...");

      // Reset form after successful signup
      setFormData({
        FirstName: "",
        LastName: "",
        email: "",
        password: "",
      });

      // Navigate to login page after 2 seconds
      setTimeout(() => {
        navigate("/admin/login");
      }, 2000);

    } catch (error) {
      if (error.response) {
        console.error("Error Response:", error.response.data);
        setErrorMessage(error.response.data.errors || "Signup failed");
      } else {
        setErrorMessage("Error: " + error.message);
      }
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Sign Up</h1>

      {/* Success Message */}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {/* Error Message */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="FirstName">First Name</label>
          <input
            type="text"
            id="FirstName"
            name="FirstName"
            value={formData.FirstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="LastName">Last Name</label>
          <input
            type="text"
            id="LastName"
            name="LastName"
            value={formData.LastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default AdminSignup;
