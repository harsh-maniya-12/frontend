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

    // Append only non-empty fields (text and file inputs)
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== "" && formData[key] !== null) {
        formDataToSend.append(key, formData[key]);
      }
    });

    console.log("🚀 Sending FormData:", Object.fromEntries(formDataToSend.entries()));

    try {
      const response = await axios.post(
        "http://localhost:4001/app/v1/du_material/upload",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      console.log("✅ Success:", response.data);
      alert("Material uploaded successfully!");

      // Reset form fields after submission
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

      // Reset file input fields
      Object.values(fileInputRefs).forEach((ref) => {
        if (ref.current) ref.current.value = "";
      });

    } catch (error) {
      console.error("❌ Error:", error.response?.data || error.message);
      alert(`Upload failed: ${error.response?.data?.message || "Unknown error"}`);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Create Material</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Text Inputs */}
        {[
          { label: "Chapter Number", name: "ch_number" },
          { label: "Chapter Name", name: "ch_name" },
          { label: "Lab Number", name: "lab_number" },
          { label: "Lab Name", name: "lab_name" },
          { label: "Note Number", name: "note_number" },
          { label: "Note Name", name: "note_name" },
          { label: "Assignment Number", name: "assignment_number" },
          { label: "Assignment Name", name: "assignment_name" },
          { label: "University Mid Paper Year", name: "uni_midPaper_year" },
          { label: "University Final Paper Year", name: "uni_finalPaper_year" },
          { label: "GTU Paper", name: "gtu_paper" },
          { label: "Name", name: "name" },
          { label: "Instagram URL", name: "insta_url" },
          { label: "LinkedIn URL", name: "linkedin_url" },
          { label: "GitHub URL", name: "git_url" },
          { label: "Semester", name: "sem" },
          { label: "Subject", name: "subject" },
        ].map((field) => (
          <div key={field.name} className="form-group mb-4">
            <label className="block text-gray-700 font-medium mb-2">{field.label}</label>
            <input
              type="text"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded text-gray-900"
            />
          </div>
        ))}

        {/* File Inputs */}
        {[
          { label: "PPT Upload", name: "ppt_upload" },
          { label: "Lab Upload", name: "lab_upload" },
          { label: "Note Upload", name: "note_upload" },
          { label: "Assignment Upload", name: "assignment_upload" },
          { label: "University Mid Paper Upload", name: "uni_midPaper_upload" },
          { label: "University Final Paper Upload", name: "uni_finalPaper_upload" },
          { label: "GTU Paper Upload", name: "gtu_paper_upload" },
        ].map((field) => (
          <div key={field.name} className="form-group mb-4">
            <label className="block text-gray-700 font-medium mb-2">{field.label}</label>
            <input
              type="file"
              name={field.name}
              ref={fileInputRefs[field.name]}
              onChange={handleFileChange}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-700 transition"
        >
          Upload Material
        </button>
      </form>
    </div>
  );
}
