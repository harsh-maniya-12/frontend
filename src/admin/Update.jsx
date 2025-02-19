  import React, { useState, useEffect } from "react";
  import { useParams, useNavigate } from "react-router-dom";
  import axios from "axios";
  import '../admin/Update.css'

  function Update() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [ch_name, setCh_name] = useState("");
    const [ch_number, setCh_number] = useState("");
    const [ppt_upload, setPpt_upload] = useState(null);

    const [lab_number, setLab_number] = useState("");
    const [lab_name, setLab_name] = useState("");
    const [lab_upload, setLab_upload] = useState(null);

    const [note_number, setNote_number] = useState("");
    const [note_name, setNote_name] = useState("");
    const [note_upload, setNote_upload] = useState(null);

    const [assignment_number, setAssignment_number] = useState("");
    const [assignment_name, setAssignment_name] = useState("");
    const [assignment_upload, setAssignment_upload] = useState(null);

    const [uni_midPaper_year, setUni_midPaper_year] = useState("");
    const [uni_midPaper_upload, setUni_midPaper_upload] = useState(null);

    const [uni_finalPaper_year, setUni_finalPaper_year] = useState("");
    const [uni_finalPaper_upload, setUni_finalPaper_upload] = useState(null);

    const [gtu_paper, setGtu_paper] = useState("");
    const [gtu_paper_upload, setGtu_paper_upload] = useState(null);

    const [sem, setSem] = useState("");
    const [subject, setSubject] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchMaterialData = async () => {
        try {
          const response = await axios.get(`https://du-material.onrender.com/app/v1/du_material/get/${id}`, {
            withCredentials: true,
          });
    
          console.log("Fetched Data:", response.data);  // This will log the full response object
    
          const materialData = response.data.data;  // Access the data from the response object
    
          // Now, set the state values using the extracted material data
          setCh_name(materialData?.ch_name || "");
          setCh_number(materialData?.ch_number || "");
          setPpt_upload(materialData?.ppt_upload?.url || null);
    
          setLab_number(materialData?.lab_number || "");
          setLab_name(materialData?.lab_name || "");
          setLab_upload(materialData?.lab_upload?.url || null);
    
          setNote_number(materialData?.note_number || "");
          setNote_name(materialData?.note_name || "");
          setNote_upload(materialData?.note_upload?.url || null);
    
          setAssignment_number(materialData?.assignment_number || "");
          setAssignment_name(materialData?.assignment_name || "");
          setAssignment_upload(materialData?.assignment_upload?.url || null);
    
          setUni_midPaper_year(materialData?.uni_midPaper_year || "");
          setUni_midPaper_upload(materialData?.uni_midPaper_upload?.url || null);
    
          setUni_finalPaper_year(materialData?.uni_finalPaper_year || "");
          setUni_finalPaper_upload(materialData?.uni_finalPaper_upload?.url || null);
    
          setGtu_paper(materialData?.gtu_paper || "");
          setGtu_paper_upload(materialData?.gtu_paper_upload?.url || null);
    
          setSem(materialData?.sem || "");
          setSubject(materialData?.subject || "");
    
          setLoading(false); // Set loading to false once the data is fetched
        } catch (error) {
          console.error("Error fetching material:", error);
          setLoading(false);
        }
      };
    
      fetchMaterialData();
    }, [id]);
    
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('Authentication token not found');
        navigate('/admin/login');
        return;
      }
    
      const formData = new FormData();
      formData.append("ch_name", ch_name);
      formData.append("ch_number", ch_number);
    
      if (ppt_upload) {
        formData.append("ppt_upload", JSON.stringify({
          public_id: ppt_upload.public_id, // Add public_id if necessary
          url: ppt_upload.url,
        }));
      }
    
      formData.append("lab_number", lab_number);
      formData.append("lab_name", lab_name);
    
      if (lab_upload) {
        formData.append("lab_upload", JSON.stringify({
          public_id: lab_upload.public_id,
          url: lab_upload.url,
        }));
      }
    
      formData.append("note_number", note_number);
      formData.append("note_name", note_name);
    
      if (note_upload) {
        formData.append("note_upload", JSON.stringify({
          public_id: note_upload.public_id,
          url: note_upload.url,
        }));
      }
    
      formData.append("assignment_number", assignment_number);
      formData.append("assignment_name", assignment_name);
    
      if (assignment_upload) {
        formData.append("assignment_upload", JSON.stringify({
          public_id: assignment_upload.public_id,
          url: assignment_upload.url,
        }));
      }
    
      formData.append("uni_midPaper_year", uni_midPaper_year);
    
      if (uni_midPaper_upload) {
        formData.append("uni_midPaper_upload", JSON.stringify({
          public_id: uni_midPaper_upload.public_id,
          url: uni_midPaper_upload.url,
        }));
      }
    
      formData.append("uni_finalPaper_year", uni_finalPaper_year);
    
      if (uni_finalPaper_upload) {
        formData.append("uni_finalPaper_upload", JSON.stringify({
          public_id: uni_finalPaper_upload.public_id,
          url: uni_finalPaper_upload.url,
        }));
      }
    
      formData.append("gtu_paper", gtu_paper);
    
      if (gtu_paper_upload) {
        formData.append("gtu_paper_upload", JSON.stringify({
          public_id: gtu_paper_upload.public_id,
          url: gtu_paper_upload.url,
        }));
      }
    
      formData.append("sem", sem);
      formData.append("subject", subject);
    
      try {
        const response = await axios.put(
          `http://localhost:4001/app/v1/du_material/update/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
    
        console.log("Update Response:", response.data);
        navigate("/"); // Redirect after successful update
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized: Token may be expired or invalid");
          navigate('/admin/dashbord');
        } else {
          console.error("Error updating material:", error);
        }
      }
    };
    
    
    
    
    

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="update-container">
      <h1>Update Material</h1>
      <form className="update-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Chapter Name:</label>
          <input
            type="text"
            value={ch_name || ""}
            onChange={(e) => setCh_name(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Chapter Number:</label>
          <input
            type="text"
            value={ch_number || ""}
            onChange={(e) => setCh_number(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>PPT Upload:</label>
          <input
            type="file"
            onChange={(e) => setPpt_upload(e.target.files[0])}
          />
          {ppt_upload && <p>Current file: {ppt_upload.name}</p>}
        </div>
    
        <div className="form-group">
          <label>Lab Number:</label>
          <input
            type="text"
            value={lab_number || ""}
            onChange={(e) => setLab_number(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Lab Name:</label>
          <input
            type="text"
            value={lab_name || ""}
            onChange={(e) => setLab_name(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Lab Upload:</label>
          <input
            type="file"
            onChange={(e) => setLab_upload(e.target.files[0])}
          />
        </div>
    
        <div className="form-group">
          <label>Note Number:</label>
          <input
            type="text"
            value={note_number || ""}
            onChange={(e) => setNote_number(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Note Name:</label>
          <input
            type="text"
            value={note_name || ""}
            onChange={(e) => setNote_name(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Note Upload:</label>
          <input
            type="file"
            onChange={(e) => setNote_upload(e.target.files[0])}
          />
        </div>
    
        <div className="form-group">
          <label>Assignment Number:</label>
          <input
            type="text"
            value={assignment_number || ""}
            onChange={(e) => setAssignment_number(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Assignment Name:</label>
          <input
            type="text"
            value={assignment_name || ""}
            onChange={(e) => setAssignment_name(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Assignment Upload:</label>
          <input
            type="file"
            onChange={(e) => setAssignment_upload(e.target.files[0])}
          />
        </div>
    
        <div className="form-group">
          <label>University Mid Paper Year:</label>
          <input
            type="text"
            value={uni_midPaper_year || ""}
            onChange={(e) => setUni_midPaper_year(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>University Mid Paper Upload:</label>
          <input
            type="file"
            onChange={(e) => setUni_midPaper_upload(e.target.files[0])}
          />
        </div>
    
        <div className="form-group">
          <label>University Final Paper Year:</label>
          <input
            type="text"
            value={uni_finalPaper_year || ""}
            onChange={(e) => setUni_finalPaper_year(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>University Final Paper Upload:</label>
          <input
            type="file"
            onChange={(e) => setUni_finalPaper_upload(e.target.files[0])}
          />
        </div>
    
        <div className="form-group">
          <label>GTU Paper:</label>
          <input
            type="text"
            value={gtu_paper || ""}
            onChange={(e) => setGtu_paper(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>GTU Paper Upload:</label>
          <input
            type="file"
            onChange={(e) => setGtu_paper_upload(e.target.files[0])}
          />
        </div>
    
        <div className="form-group">
          <label>Semester:</label>
          <input
            type="text"
            value={sem || ""}
            onChange={(e) => setSem(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Subject:</label>
          <input
            type="text"
            value={subject || ""}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
    
        <button className="update-button" type="submit">Update Material</button>
      </form>
    </div>
    
    );
  }

  export default Update;
