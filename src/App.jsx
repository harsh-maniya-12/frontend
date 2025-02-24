import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Sem1 from "./components/semsters/sem1";
import Sem2 from './components/semsters/sem2'
import Sem3 from './components/semsters/sem3'
import Sem4 from './components/semsters/sem4'
import Sem5 from './components/semsters/sem5'
import Sem6 from './components/semsters/sem6'
import Sem7 from './components/semsters/sem7'


import Sem1Data from './components/semsters/sem_data/sem1_data'
import Wd from './components/semsters/sem_data/wd'
import English from './components/semsters/sem_data/english'
import Phy from './components/semsters/sem_data/phy'
import Maths from './components/semsters/sem_data/maths'
import Eg from './components/semsters/sem_data/eg'
import Uni_paper_sem1 from "./components/university_paper/uni_paper_sem1";
import Uni_paper_sem2 from './components/university_paper/uni_paper_sem2';
import Uni_paper_sem3 from './components/university_paper/uni_paper_sem3';
import Uni_paper_sem4 from './components/university_paper/uni_paper_sem4';
import Uni_paper_sem5 from './components/university_paper/uni_paper_sem5'
import Uni_paper_sem6 from './components/university_paper/uni_paper_sem6'
import Uni_paper_sem7 from './components/university_paper/uni_paper_sem7'


import Gtu_paper_sem1 from "./components/gtu_paper/gtu_paper_sem1";
import Gtu_paper_sem2 from './components/gtu_paper/gtu_paper_sem2';
import GtuPaperSem3 from './components/gtu_paper/gtu_paper_sem3'

import AdminSignup from './admin/AdminSignup'
import AdminLogin from './admin/AdminLogin'
import MaterialCreate from './admin/MaterialCreate'
import Dashbord from './admin/Dashbord'
import OurMaterial from './admin/OurMaterial'
import Update from './admin/Update'
import Dbms from './components/sem2_data/dbms'
import Oop from './components/sem2_data/oop'
import Maths2 from './components/sem2_data/maths2'
import Phy2 from './components/sem2_data/phy'
import Eg2 from './components/sem2_data/eg'
import Oat from './components/sem2_data/oat'
import Dbms2 from './components/sem3_data/dbms2'
import Digital from './components/sem3_data/digital'
import Dmaths from './components/sem3_data/dmaths'
import Ds from './components/sem3_data/dsa'
import Ic from './components/sem3_data/ic'
import Wt from './components/sem3_data/wt'
import Dsa from './components/sem3_data/dsa'
import Daa from './components/sem4_data/daa'
import Flutter from './components/sem4_data/flutter'
import Os from './components/sem4_data/os'
import Pc from './components/sem4_data/pc'
import Ps from './components/sem4_data/ps'
import Python from './components/sem4_data/python'
import GtuPaperSem4 from './components/gtu_paper/gtu_paper_sem4'
import Cn from './components/sem5_data/cn'
import Se from './components/sem5_data/se'
import Dm from './components/sem5_data/dm'
import Net from './components/sem5_data/net'
import Foa from './components/sem5_data/foa'
import Pc2 from './components/sem5_data/pc2'
import GtuPaperSem5 from './components/gtu_paper/gtu_paper_sem5'
import Ml from './components/sem6_data/ml'
import Csa from './components/sem6_data/csa'
import Iot from './components/sem6_data/iot'
import Toc from './components/sem6_data/toc'
import Net2 from './components/sem6_data/net2'
import Cs from './components/sem6_data/cs'
import Co from './components/sem6_data/co'
import GtuPaperSem6 from './components/gtu_paper/gtu_paper_sem6'
import GtuPaperSem7 from './components/gtu_paper/gtu_paper_sem7'


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        
        {/*all card routing of semester */}
        <Route path="/sem1" element={<Sem1 />} />
        <Route path="/sem2" element={<Sem2 />} />
        <Route path="/sem3" element={<Sem3 />} />
        <Route path="/sem4" element={<Sem4 />} />
        <Route path="/sem5" element={<Sem5 />} />
        <Route path="/sem6" element={<Sem6 />} />
        <Route path="/sem7" element={<Sem7 />} />
        
        <Route path="/uni_paper_sem1" element={<Uni_paper_sem1 />} />
        <Route path="/uni_paper_sem2" element={<Uni_paper_sem2/>} />
        <Route path="/uni_paper_sem3" element={<Uni_paper_sem3/>} />
        <Route path="/uni_paper_sem4" element={<Uni_paper_sem4/>} />
        <Route path="/uni_paper_sem5" element={<Uni_paper_sem5/>} />
        <Route path="/uni_paper_sem6" element={<Uni_paper_sem6/>} />
        <Route path="/uni_paper_sem7" element={<Uni_paper_sem7/>} />

        <Route path="/gtu_paper_sem1" element={<Gtu_paper_sem1 />} />
        <Route path="/gtu_paper_sem2" element={<Gtu_paper_sem2 />} />
        <Route path="/gtu_paper_sem3" element={<GtuPaperSem3 />} />
        <Route path="/gtu_paper_sem4" element={<GtuPaperSem4 />} />
        <Route path="/gtu_paper_sem5" element={<GtuPaperSem5 />} />
        <Route path="/gtu_paper_sem6" element={<GtuPaperSem6 />} />
        <Route path="/gtu_paper_sem7" element={<GtuPaperSem7 />} />
        
     
     {/*All subject routing */}
        <Route path="/sem1data" element={<Sem1Data />} />
        <Route path="/wd" element={<Wd/>} />
        <Route path="/english" element={<English/>} />
        <Route path="/phy" element={< Phy/>} />
        <Route path='maths' element={<Maths/>}/>
        <Route path='eg' element={<Eg/>}/>

        <Route path='dbms' element={<Dbms/>}/>
        <Route path='oop' element={<Oop/>}/>
        <Route path='maths2' element={<Maths2/>}/>
        <Route path='phy2' element={<Phy2/>}/>
        <Route path='eg2' element={<Eg2/>}/>
        <Route path='oat' element={<Oat/>}/>


        <Route path='dbms2' element={<Dbms2/>}/>
        <Route path='digital' element={<Digital/>}/>
        <Route path='dmaths' element={<Dmaths/>}/>
        <Route path='dsa' element={<Dsa/>}/>
        <Route path='ic' element={<Ic/>}/>
        <Route path='wt' element={<Wt/>}/>

        <Route path='daa' element={<Daa/>}/>
        <Route path='flutter' element={<Flutter/>}/>
        <Route path='os' element={<Os/>}/>
        <Route path='pc' element={<Pc/>}/>
        <Route path='ps' element={<Ps/>}/>
        <Route path='python' element={<Python/>}/>

        <Route path='cn' element={<Cn/>}/>
        <Route path='se' element={<Se/>}/>
        <Route path='dm' element={<Dm/>}/>
        <Route path='net' element={<Net/>}/>
        <Route path='foa' element={<Foa/>}/>
        <Route path='pc2' element={<Pc2/>}/>
      

        <Route path='ml' element={<Ml/>}/>
        <Route path='csa' element={<Csa/>}/>
        <Route path='iot' element={<Iot/>}/>
        <Route path='toc' element={<Toc/>}/>
        <Route path='net2' element={<Net2/>}/>
        <Route path='co' element={<Co/>}/>
        <Route path='cs' element={<Cs/>}/>



{/*admin route */}
<Route path='/admin/signup' element={<AdminSignup/>}/>
<Route path='/admin/login' element={<AdminLogin/>}/>
<Route path='/admin/materialcreate' element={<MaterialCreate/>}/>
<Route path='/admin/dashbord' element={<Dashbord/>}/>
<Route path='/admin/ourmaterial' element={<OurMaterial/>}/>
<Route path="/update/:id" element={<Update />} />


        
      </Routes>
    </div>
  )
}

export default App
