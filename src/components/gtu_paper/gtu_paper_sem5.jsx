import React, { useState, useEffect } from "react";
import axios from "axios";
import "../paper_responsive.css";

function UniPaperSem5() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://du-material.onrender.com/app/v1/du_material/get",
          { withCredentials: true }
        );

        console.log("API Response:", data);

        const sem1Materials = data.duMaterials?.filter(
          (item) =>
            item.sem === "5" &&
            item.subject &&
            (item.uni_midPaper_year || item.uni_finalPaper_year)
        ) || [];

        console.log("Filtered Sem 5 Materials:", sem1Materials);

        const groupedMaterials = sem1Materials.reduce((acc, item) => {
          if (!acc[item.subject]) {
            acc[item.subject] = [];
          }
          acc[item.subject].push(item);
          return acc;
        }, {});

        setMaterials(groupedMaterials);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle File Download
  const handleDownload = (url, fileName = "file.pdf") => {
    if (!url) return alert("File not available.");
    
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        University Papers - Semester 5
      </h1>

      {loading ? (
        <p className="text-lg text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-lg text-center text-red-500">{error}</p>
      ) : Object.keys(materials).length > 0 ? (
        Object.entries(materials).map(([subject, papers]) => (
          <div key={subject} className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2 mb-4">
              {subject || "Subject Not Available"}
            </h2>
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Year</th>
                  <th className="border border-gray-300 px-4 py-2">Type</th>
                  <th className="border border-gray-300 px-4 py-2">Download</th>
                </tr>
              </thead>
              <tbody>
                {papers.map((item, index) => (
                  <React.Fragment key={index}>
                    {item.uni_midPaper_year && (
                      <tr className="border border-gray-300 hover:bg-gray-50 transition">
                        <td className="px-4 py-2 border border-gray-300">{item.uni_midPaper_year}</td>
                        <td className="px-4 py-2 border border-gray-300">Mid Paper</td>
                        <td className="px-4 py-2 border border-gray-300 text-center">
                          <button
                            onClick={() =>
                              handleDownload(
                                item.uni_midPaper_upload?.url,
                                item.uni_midPaper_upload?.public_id?.split("/").pop()
                              )
                            }
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                          >
                            Download
                          </button>
                        </td>
                      </tr>
                    )}
                    {item.uni_finalPaper_year && (
                      <tr className="border border-gray-300 hover:bg-gray-50 transition">
                        <td className="px-4 py-2 border border-gray-300">{item.uni_finalPaper_year}</td>
                        <td className="px-4 py-2 border border-gray-300">Final Paper</td>
                        <td className="px-4 py-2 border border-gray-300 text-center">
                          <button
                            onClick={() =>
                              handleDownload(
                                item.uni_finalPaper_upload?.url,
                                item.uni_finalPaper_upload?.public_id?.split("/").pop()
                              )
                            }
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
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
        <p className="text-lg text-center text-gray-600">No university papers available.</p>
      )}
    </div>
  );
}

export default UniPaperSem5;
