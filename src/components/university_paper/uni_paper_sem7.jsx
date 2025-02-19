import React, { useState, useEffect } from "react";
import axios from "axios";

function UniPaperSem7() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://du-material.onrender.com/app/v1/du_material/get",
          { withCredentials: true }
        );

        console.log("API Response:", response.data); // Debugging API response

        if (Array.isArray(response.data.duMaterials)) {
          // Filter Semester 4 materials
          const sem4Materials = response.data.duMaterials.filter(
            (item) => String(item.sem) === "7"
          );

          console.log("Filtered Semester 7 Data:", sem4Materials); // Debugging filtered data

          setMaterials(sem4Materials);
        } else {
          console.error("API response does not contain 'duMaterials' array.");
          alert("Invalid data format from server.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch data. Please check your network.");
      } finally {
        setLoading(false);
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

  // Group university paper data by subject
  const groupBySubject = (materials) => {
    const grouped = {};

    materials.forEach((item) => {
      if (item.subject) {
        if (!grouped[item.subject]) {
          grouped[item.subject] = [];
        }
        // Check if the paper is mid or final
        if (item.uni_midPaper_year || item.uni_finalPaper_year) {
          grouped[item.subject].push(item);
        }
      }
    });

    return grouped;
  };

  const groupedPapers = groupBySubject(materials);

  return (
    <div className="main-container">
      <h1>University Papers - Semester 7</h1>
      {loading ? (
        <p>Loading...</p>
      ) : Object.keys(groupedPapers).length > 0 ? (
        Object.entries(groupedPapers).map(([subject, papers]) => (
          <div key={subject} className="subject-table-container">
            <h2>{subject}</h2>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Type</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                {papers.map((item, index) => (
                  <React.Fragment key={index}>
                    {/* Mid Paper */}
                    {item.uni_midPaper_year && (
                      <tr>
                        <td>{item.uni_midPaper_year}</td>
                        <td>Mid Paper</td>
                        <td>
                          <button
                            onClick={() =>
                              handleDownload(
                                item.uni_midPaper_upload?.url,
                                item.uni_midPaper_upload?.public_id?.split("/").pop()
                              )
                            }
                            className="download-button"
                          >
                            Download
                          </button>
                        </td>
                      </tr>
                    )}
                    {/* Final Paper */}
                    {item.uni_finalPaper_year && (
                      <tr>
                        <td>{item.uni_finalPaper_year}</td>
                        <td>Final Paper</td>
                        <td>
                          <button
                            onClick={() =>
                              handleDownload(
                                item.uni_finalPaper_upload?.url,
                                item.uni_finalPaper_upload?.public_id?.split("/").pop()
                              )
                            }
                            className="download-button"
                          >
                            Download
                          </button>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p className="loading-text">No university papers available...</p>
      )}
    </div>
  );
}

export default UniPaperSem7;
