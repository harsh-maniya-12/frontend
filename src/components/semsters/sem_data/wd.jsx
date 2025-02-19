import React, { useState, useEffect } from "react";
import axios from "axios";
import "./table.css"; // Ensure this file has the appropriate CSS

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><a href="#chapters">PPT Material</a></li>
        <li><a href="#labs">Lab Material</a></li>
        <li><a href="#notes">Note Material</a></li>
        <li><a href="#assignments">Assignment Material</a></li>
      </ul>
    </nav>
  );
}

function Wd() {
  const [materials, setMaterials] = useState([]);

  // Fetch Data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://du-material.onrender.com/app/v1/du_material/get",
          { withCredentials: true }
        );

        console.log("API Response:", response.data); // Check the structure of the API response

        // Check if duMaterials exists and is an array
        if (Array.isArray(response.data.duMaterials)) {
          // Filter the data based on sem == 1 and subject == 'wd'
          const filteredMaterials = response.data.duMaterials.filter(
            (item) => item.sem === "1" && item.subject === 'Web Designing'
          );
          setMaterials(filteredMaterials);
        } else {
          console.error("API response does not contain 'duMaterials' array.");
          alert("Invalid data format from server.");
        }

      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch data. Please check your network.");
      }
    };

    fetchData();
  }, []);

  // Handle File Download
  const handleDownload = (url, fileName) => {
    if (!url) {
      alert("File not available.");
      return;
    }
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName || "file.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Render Table
  const renderTable = (data, title, numberField, nameField, uploadField, id) => (
    <div className="table-container" id={id}>
      <h2 className="table-title">{title}</h2>
      {data.length > 0 ? (
        <table className="custom-table">
          <thead>
            <tr>
              <th>{numberField}</th>
              <th>{nameField}</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item[numberField]}</td>
                <td>{item[nameField]}</td>
                <td>
                  <button
                    onClick={() =>
                      handleDownload(
                        item?.[uploadField]?.url,
                        item?.[uploadField]?.public_id?.split("/").pop()
                      )
                    }
                    className="download-button"
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="loading-text">No data available...</p>
      )}
    </div>
  );

  // Check if materials is an array before filtering
  const chapters = Array.isArray(materials) ? materials.filter(item => item.ppt_upload) : [];
  const labs = Array.isArray(materials) ? materials.filter(item => item.lab_upload) : [];
  const notes = Array.isArray(materials) ? materials.filter(item => item.note_upload) : [];
  const assignments = Array.isArray(materials) ? materials.filter(item => item.assignment_upload) : [];

  return (
    <div className="main-container">
      {/* Navbar at the top */}
      <Navbar />

      {renderTable(chapters, "PPT Material", "ch_number", "ch_name", "ppt_upload", "chapters")}
      {renderTable(labs, "Lab Material", "lab_number", "lab_name", "lab_upload", "labs")}
      {renderTable(notes, "Note Material", "note_number", "note_name", "note_upload", "notes")}
      {renderTable(assignments, "Assignment Material", "assignment_number", "assignment_name", "assignment_upload", "assignments")}
    </div>
  );
}

export default Wd;
