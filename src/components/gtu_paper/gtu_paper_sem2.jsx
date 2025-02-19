import React, { useState, useEffect } from "react";
import axios from "axios";

function GtuPaperSem2() {
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

        // Filter only Semester 2 GTU Papers
        const sem2Materials = data.duMaterials?.filter(
          (item) => item.sem === "2" && item.subject && item.gtu_paper && item.gtu_paper_upload?.url
        ) || [];

        console.log("Filtered Sem 2 Materials:", sem2Materials);

        // Group materials by subject
        const groupedMaterials = sem2Materials.reduce((acc, item) => {
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
        GTU Papers - Semester 2
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
                  <th className="border border-gray-300 px-4 py-2">Download</th>
                </tr>
              </thead>
              <tbody>
                {papers.map((item, index) => (
                  <tr key={index} className="border border-gray-300 hover:bg-gray-50 transition">
                    <td className="px-4 py-2 border border-gray-300">{item.gtu_paper}</td>
                    <td className="px-4 py-2 border border-gray-300 text-center">
                      <button
                        onClick={() =>
                          handleDownload(
                            item.gtu_paper_upload.url,
                            item.gtu_paper_upload.public_id?.split("/").pop()
                          )
                        }
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p className="text-lg text-center text-gray-600">No Sem 2 materials available.</p>
      )}
    </div>
  );
}

export default GtuPaperSem2;
