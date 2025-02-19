import { useState, useEffect } from "react";
import axios from "axios";

export default function MCQManager() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState({ A: "", B: "", C: "", D: "" });
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [chapter, setChapter] = useState("");
  const [file, setFile] = useState(null);
  const [mcqs, setMcqs] = useState([]);

  useEffect(() => {
    fetchMCQs();
  }, []);

  const fetchMCQs = async () => {
    try {
      const res = await axios.get("http://localhost:3000/app/v1/mcq");
      setMcqs(res.data);
    } catch (error) {
      console.error("Error fetching MCQs:", error.message);
    }
  };

  const handleAddMCQ = async () => {
    if (!question || !correctAnswer || !chapter) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/app/v1/mcq/add", {
        question,
        options,
        correct_answer: correctAnswer,
        chapter,
      });

      setQuestion("");
      setOptions({ A: "", B: "", C: "", D: "" });
      setCorrectAnswer("");
      setChapter("");
      fetchMCQs();
    } catch (error) {
      console.error("Error adding MCQ:", error.message);
    }
  };

  const handleUploadCSV = async () => {
    if (!file) {
      alert("Please select a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:3000/app/v1/mcq/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchMCQs();
    } catch (error) {
      console.error("Error uploading CSV:", error.message);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">MCQ Manager</h2>

      {/* Add Single MCQ */}
      <div className="mb-6 p-4 border rounded">
        <input
          type="text"
          placeholder="Question"
          className="border p-2 w-full mb-2"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        {Object.keys(options).map((key) => (
          <input
            key={key}
            type="text"
            placeholder={`Option ${key}`}
            className="border p-2 w-full mb-2"
            value={options[key]}
            onChange={(e) => setOptions({ ...options, [key]: e.target.value })}
          />
        ))}
        <input
          type="text"
          placeholder="Correct Answer (A/B/C/D)"
          className="border p-2 w-full mb-2"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
        />
        <input
          type="text"
          placeholder="Chapter"
          className="border p-2 w-full mb-2"
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAddMCQ}
        >
          Add MCQ
        </button>
      </div>

      {/* Upload CSV */}
      <div className="mb-6 p-4 border rounded">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mb-2" />
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleUploadCSV}>
          Upload CSV
        </button>
      </div>

      {/* List MCQs */}
      <table className="w-full border-collapse border mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Question</th>
            <th className="border p-2">Options</th>
            <th className="border p-2">Correct Answer</th>
            <th className="border p-2">Chapter</th>
          </tr>
        </thead>
        <tbody>
          {mcqs.map((mcq, index) => (
            <tr key={index} className="border">
              <td className="border p-2">{mcq.question}</td>
              <td className="border p-2">
                A: {mcq.options.A}, B: {mcq.options.B}, C: {mcq.options.C}, D: {mcq.options.D}
              </td>
              <td className="border p-2">{mcq.correct_answer}</td>
              <td className="border p-2">{mcq.chapter}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
