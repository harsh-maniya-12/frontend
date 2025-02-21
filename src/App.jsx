import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Sem1 from "./components/semsters/sem1";
import Sem2 from './components/semsters/sem2';
import Sem3 from './components/semsters/sem3';
import Sem4 from './components/semsters/sem4';
import Sem5 from './components/semsters/sem5';
import Sem6 from './components/semsters/sem6';
import Sem7 from './components/semsters/sem7';

import Sem1Data from './components/semsters/sem_data/sem1_data';
import Wd from './components/semsters/sem_data/wd';
import English from './components/semsters/sem_data/english';
import Phy from './components/semsters/sem_data/phy';
import Maths from './components/semsters/sem_data/maths';
import Eg from './components/semsters/sem_data/eg';

import Uni_paper_sem1 from "./components/university_paper/uni_paper_sem1";
import Gtu_paper_sem1 from "./components/gtu_paper/gtu_paper_sem1";

import AdminSignup from './admin/AdminSignup';
import AdminLogin from './admin/AdminLogin';
import MaterialCreate from './admin/MaterialCreate';
import Dashbord from './admin/Dashbord';
import OurMaterial from './admin/OurMaterial';
import Update from './admin/Update';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Semester Pages */}
        <Route path="/sem1" element={<Sem1 />} />
        <Route path="/sem2" element={<Sem2 />} />
        <Route path="/sem3" element={<Sem3 />} />
        <Route path="/sem4" element={<Sem4 />} />
        <Route path="/sem5" element={<Sem5 />} />
        <Route path="/sem6" element={<Sem6 />} />
        <Route path="/sem7" element={<Sem7 />} />

        {/* University & GTU Papers */}
        <Route path="/uni_paper_sem1" element={<Uni_paper_sem1 />} />
        <Route path="/gtu_paper_sem1" element={<Gtu_paper_sem1 />} />

        {/* Subject Pages */}
        <Route path="/sem1data" element={<Sem1Data />} />
        <Route path="/wd" element={<Wd />} />
        <Route path="/english" element={<English />} />
        <Route path="/phy" element={<Phy />} />
        <Route path="/maths" element={<Maths />} />
        <Route path="/eg" element={<Eg />} />

        {/* Admin Routes */}
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/materialcreate" element={<MaterialCreate />} />
        <Route path="/admin/dashbord" element={<Dashbord />} />
        <Route path="/admin/ourmaterial" element={<OurMaterial />} />
        <Route path="/update/:id" element={<Update />} />

        {/* Fallback Route */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
