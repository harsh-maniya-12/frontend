import React, { useState, useEffect } from "react";
import axios from "axios";

function English() {
  const [notes, setNotes] = useState([]);
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

        // Filter English subject notes for Sem 1
        const englishNotes = data.duMaterials?.filter(
          (item) =>
            item.sem === "1" &&
            (item.subject.toLowerCase() === "english" || item.subject === "English") &&
            item.note_name && // Ensure note name exists
            item.note_upload?.url // Ensure URL exists
        ) || [];

        console.log("Filtered English Notes:", englishNotes);

        setNotes(englishNotes);
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
        E Note - English Subject (Sem 1)
      </h1>

      {loading ? (
        <p className="text-lg text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-lg text-center text-red-500">{error}</p>
      ) : notes.length > 0 ? (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2 mb-4">
            English Notes
          </h2>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Topic</th>
                <th className="border border-gray-300 px-4 py-2">Download</th>
              </tr>
            </thead>
            <tbody>
              {notes.map((item, index) => (
                <tr key={index} className="border border-gray-300 hover:bg-gray-50 transition">
                  <td className="px-4 py-2 border border-gray-300">{item.note_name}</td>
                  <td className="px-4 py-2 border border-gray-300 text-center">
                    <button
                      onClick={() =>
                        handleDownload(
                          item.note_upload.url,
                          item.note_upload.public_id?.split("/").pop() || "file.pdf"
                        )
                      }
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-lg text-center text-gray-600">No English notes available for Sem 1.</p>
      )}
    </div>
  );
}

export default English;
