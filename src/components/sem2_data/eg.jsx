import React, { useState, useEffect } from "react";
import axios from "axios";
import "../responsive.css";


function Eg2() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://du-material.onrender.com/app/v1/du_material/get",
          { withCredentials: true }
        );

        console.log("API Response:", data);

        // Filter only Semester 2 materials (e.g., Physics, etc.)
        const filteredMaterials = data.duMaterials?.filter(
          (item) => item.sem === "2" && (item.subject.toLowerCase() === "eg" || item.subject === "Engineering Graphics" )
        ) || [];

        setMaterials(filteredMaterials);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDownload = (url, fileName = "file.pdf") => {
    if (!url) return alert("File not available.");

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
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
      <h1 className="text-center text-3xl font-bold text-gray-800 my-6">EG - Semester 2</h1>

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : error ? (
        <p className="loading-text text-red-500">{error}</p>
      ) : (
        <>
          {renderTable(chapters, "PPT Material", "ch_number", "ch_name", "ppt_upload", "chapters")}
          {renderTable(labs, "Lab Material", "lab_number", "lab_name", "lab_upload", "labs")}
          {renderTable(notes, "Note Material", "note_number", "note_name", "note_upload", "notes")}
          {renderTable(assignments, "Assignment Material", "assignment_number", "assignment_name", "assignment_upload", "assignments")}
        </>
      )}
    </div>
  );
}

export default Eg2;
