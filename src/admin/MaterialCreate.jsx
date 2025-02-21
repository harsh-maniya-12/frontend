import React, { useState, useRef } from "react";
import axios from "axios";

export default function MaterialCreate() {
  const [formData, setFormData] = useState({
    ch_number: "",
    ch_name: "",
    ppt_upload: null,
    lab_number: "",
    lab_name: "",
    lab_upload: null,
    note_number: "",
    note_name: "",
    note_upload: null,
    assignment_number: "",
    assignment_name: "",
    assignment_upload: null,
    uni_midPaper_year: "",
    uni_midPaper_upload: null,
    uni_finalPaper_year: "",
    uni_finalPaper_upload: null,
    gtu_paper: "",
    gtu_paper_upload: null,
    name: "",
    insta_url: "",
    linkedin_url: "",
    git_url: "",
    sem: "",
    subject: "",
  });

  // Refs for file inputs
  const fileInputRefs = {
    ppt_upload: useRef(null),
    lab_upload: useRef(null),
    note_upload: useRef(null),
    assignment_upload: useRef(null),
    uni_midPaper_upload: useRef(null),
    uni_finalPaper_upload: useRef(null),
    gtu_paper_upload: useRef(null),
  };

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files.length > 0 ? files[0] : null });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You must be logged in to upload materials.");
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== "" && formData[key] !== null) {
        formDataToSend.append(key, formData[key]);
      }
    });

    console.log("🚀 Sending FormData:", Object.fromEntries(formDataToSend.entries()));

    try {
      const response = await axios.post(
        "https://du-material.onrender.com/app/v1/du_material/upload",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "multipart/form-data" is set automatically by axios with FormData
          },
          withCredentials: true,
        }
      );

      console.log("✅ Success:", response.data);
      alert("Materials uploaded successfully!");

      // Reset form fields
      setFormData({
        ch_number: "",
        ch_name: "",
        ppt_upload: null,
        lab_number: "",
        lab_name: "",
        lab_upload: null,
        note_number: "",
        note_name: "",
        note_upload: null,
        assignment_number: "",
        assignment_name: "",
        assignment_upload: null,
        uni_midPaper_year: "",
        uni_midPaper_upload: null,
        uni_finalPaper_year: "",
        uni_finalPaper_upload: null,
        gtu_paper: "",
        gtu_paper_upload: null,
        name: "",
        insta_url: "",
        linkedin_url: "",
        git_url: "",
        sem: "",
        subject: "",
      });

      // Reset file inputs
      Object.values(fileInputRefs).forEach((ref) => {
        if (ref.current) ref.current.value = "";
      });
    } catch (error) {
      console.error("❌ Error:", error.response?.data || error.message);
      alert(`Upload failed: ${error.response?.data?.error || "Unknown error"}`);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-blue-700 text-center">Upload Study Materials</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-8">
        {/* Common Fields: Semester and Subject */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Common Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">Semester</label>
              <select
                name="sem"
                value={formData.sem}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-lg text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200"
              >
                <option value="">Select Semester</option>
                {[...Array(7)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Semester {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">Subject</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-lg text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200"
              >
                <option value="">Select Subject</option>
                {[
                  "Computer Programming using C",
                  "Web Designing",
                  "English",
                  "Fundamental of Electronics",
                  "Mathematics",
                  "Environmental Studies",
                  "Database Management System - I",
                  "Object Oriented Programming",
                  "Mathematics - II",
                  "Physics",
                  "Engineering Graphics",
                  "Office Automation Tools",
                  "Data Structure",
                  "Database Management System - II",
                  "Web Technology",
                  "Digital Fundamentals",
                  "Discrete Mathematics",
                  "Indian Constitution",
                  "Design and Analysis of Algorithm",
                  "Python Programming",
                  "Mobile Application Development using Flutter",
                  "Operating System",
                  "Probability & Statistics",
                  "Professional Communication - I",
                  "Computer Network",
                  "Software Engineering",
                  "ASP.NET Core",
                  "Data Mining",
                  "Fundamentals of Accounting",
                  "Professional Communication - II",
                  "Machine Learning",
                  "Advanced Dot Net",
                  "Internet of Things",
                  "Computer System Architecture",
                  "Theory of Computation",
                  "Career Orientation",
                ].map((subject, index) => (
                  <option key={index} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* PPT Upload Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">PPT Upload</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">Chapter Number</label>
              <input
                type="text"
                name="ch_number"
                value={formData.ch_number}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-lg text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">Chapter Name</label>
              <input
                type="text"
                name="ch_name"
                value={formData.ch_name}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-lg text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="form-group md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">PPT Upload</label>
              <input
                type="file"
                name="ppt_upload"
                ref={fileInputRefs.ppt_upload}
                onChange={handleFileChange}
                className="border border-gray-300 p-2 w-full rounded-lg text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Lab Upload Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Lab Upload</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">Lab Number</label>
              <input
                type="text"
                name="lab_number"
                value={formData.lab_number}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-lg text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">Lab Name</label>
              <input
                type="text"
                name="lab_name"
                value={formData.lab_name}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-lg text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="form-group md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">Lab Upload</label>
              <input
                type="file"
                name="lab_upload"
                ref={fileInputRefs.lab_upload}
                onChange={handleFileChange}
                className="border border-gray-300 p-2 w-full rounded-lg text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Note Upload Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Note Upload</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">Note Number</label>
              <input
                type="text"
                name="note_number"
                value={formData.note_number}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-lg text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">Note Name</label>
              <input
                type="text"
                name="note_name"
                value={formData.note_name}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-lg text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="form-group md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">Note Upload</label>
              <input
                type="file"
                name="note_upload"
                ref={fileInputRefs.note_upload}
                onChange={handleFileChange}
                className="border border-gray-300 p-2 w-full rounded-lg text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Assignment Upload Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Assignment Upload</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">Assignment Number</label>
              <input
                type="text"
                name="assignment_number"
                value={formData.assignment_number}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-lg text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">Assignment Name</label>
              <input
                type="text"
                name="assignment_name"
                value={formData.assignment_name}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-lg text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="form-group md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">Assignment Upload</label>
              <input
                type="file"
                name="assignment_upload"
                ref={fileInputRefs.assignment_upload}
                onChange={handleFileChange}
                className="border border-gray-300 p-2 w-full rounded-lg text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* University Papers Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">University Papers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">Mid Paper Year</label>
              <input
                type="text"
                name="uni_midPaper_year"
                value={formData.uni_midPaper_year}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-lg text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">Mid Paper Upload</label>
              <input
                type="file"
                name="uni_midPaper_upload"
                ref={fileInputRefs.uni_midPaper_upload}
                onChange={handleFileChange}
                className="border border-gray-300 p-2 w-full rounded-lg text-gray-900"
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">Final Paper Year</label>
              <input
                type="text"
                name="uni_finalPaper_year"
                value={formData.uni_finalPaper_year}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-lg text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">Final Paper Upload</label>
              <input
                type="file"
                name="uni_finalPaper_upload"
                ref={fileInputRefs.uni_finalPaper_upload}
                onChange={handleFileChange}
                className="border border-gray-300 p-2 w-full rounded-lg text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* GTU Papers Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">GTU Papers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">GTU Paper</label>
              <input
                type="text"
                name="gtu_paper"
                value={formData.gtu_paper}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-lg text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">GTU Paper Upload</label>
              <input
                type="file"
                name="gtu_paper_upload"
                ref={fileInputRefs.gtu_paper_upload}
                onChange={handleFileChange}
                className="border border-gray-300 p-2 w-full rounded-lg text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Network Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contributor Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-lg text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">Instagram URL</label>
              <input
                type="text"
                name="insta_url"
                value={formData.insta_url}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-lg text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">LinkedIn URL</label>
              <input
                type="text"
                name="linkedin_url"
                value={formData.linkedin_url}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-lg text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">GitHub URL</label>
              <input
                type="text"
                name="git_url"
                value={formData.git_url}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-lg text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Submit All Materials
          </button>
        </div>
      </form>
    </div>
  );
}
