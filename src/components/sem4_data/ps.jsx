import React, { useState, useEffect } from "react";
import axios from "axios";
import "../responsive.css";

function Ps() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://du-material.onrender.com/app/v1/du_material/get",
          { withCredentials: true }
        );

        console.log("API Response:", response.data);

        if (Array.isArray(response.data.duMaterials)) {
          // Filter for Semester 4 and subject "PS"
          const filteredMaterials = response.data.duMaterials.filter(
            (item) => item.sem === "4" && (item.subject.toLowerCase() === "ps" ||item.subject=== "Probability & Statistics" )
          );
          setMaterials(filteredMaterials);
        } else {
          console.error("Invalid API response format.");
          setError("Invalid data format from server.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please check your network.");
      } finally {
        setLoading(false);
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

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Problem Solving (PS) - Semester 4</h1>

      {loading ? (
        <p className="text-lg text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-lg text-center text-red-500">{error}</p>
      ) : materials.length > 0 ? (
        <div>
          {materials.map((item, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2 mb-4">
                {item.subject || "Subject Not Available"}
              </h2>
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">Material Name</th>
                    <th className="border border-gray-300 px-4 py-2">Download</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border border-gray-300 hover:bg-gray-50 transition">
                    <td className="px-4 py-2 border border-gray-300">{item.name || "Material Not Available"}</td>
                    <td className="px-4 py-2 border border-gray-300 text-center">
                      <button
                        onClick={() =>
                          handleDownload(
                            item?.ppt_upload?.url || item?.note_upload?.url || item?.assignment_upload?.url,
                            item?.ppt_upload?.public_id?.split("/").pop() || item?.note_upload?.public_id?.split("/").pop() || item?.assignment_upload?.public_id?.split("/").pop()
                          )
                        }
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg text-center text-gray-600">No PS materials available for Semester 4.</p>
      )}
    </div>
  );
}

export default Ps;
