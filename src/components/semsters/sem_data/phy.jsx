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
        <li><a href="#mcq">MCQ Practice</a></li>
      </ul>
    </nav>
  );
}

function Phy() {
  const [materials, setMaterials] = useState([]);
  const [mcqs, setMcqs] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://du-material.onrender.com/app/v1/du_material/get",
          { withCredentials: true }
        );

        console.log("API Response:", response.data); // Check API response structure

        if (Array.isArray(response.data.duMaterials)) {
          const filteredMaterials = response.data.duMaterials.filter(
            (item) => item.sem === "1" && (item.subject.toLowerCase() === "foe" || item.subject === "Fundamental of Electronics" )
          );
          setMaterials(filteredMaterials);
        } else {
          console.error("Invalid API response format.");
          alert("Invalid data format from server.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch data. Please check your network.");
      }
    };

    fetchData();
  }, []);

 


 

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
                        item?.[uploadField]?.url.split("/").pop()
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

 

  const chapters = materials.filter(item => item.ppt_upload);
  const labs = materials.filter(item => item.lab_upload);
  const notes = materials.filter(item => item.note_upload);
  const assignments = materials.filter(item => item.assignment_upload);

  return (
    <div className="main-container">
      <Navbar />
      <h1 className="page-title">Physics (FOE) - Semester 1</h1>
      {renderTable(chapters, "PPT Material", "ch_number", "ch_name", "ppt_upload", "chapters")}
      {renderTable(labs, "Lab Material", "lab_number", "lab_name", "lab_upload", "labs")}
      {renderTable(notes, "Note Material", "note_number", "note_name", "note_upload", "notes")}
      {renderTable(assignments, "Assignment Material", "assignment_number", "assignment_name", "assignment_upload", "assignments")}
      
    </div>
  );
}

export default Phy;
