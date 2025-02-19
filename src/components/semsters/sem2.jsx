
import React from "react";
import { useNavigate } from "react-router-dom";

const Sem2 = () => {
  const navigate = useNavigate();

  const handleClick = (route) => {
    navigate(route);
  };
  return (
    <div className="bg-[#001f3f] min-h-screen">
      <div className="container mx-auto p-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleClick("/dbms")}
          >
             {/*img  */}
            <div className="relative">
             
              <img
                alt="Illustration of a computer, books, and a graduation cap"
                className="w-full h-48 object-cover"
                height="400"
                src="dbms.jpg"
                width="600"
              />
             
            </div>
            {/*text */}
            <div className="p-4">
              <h2 className="text-blue-600 font-semibold">
              Database Management System - I
              </h2>
            </div>
          </div>

          

          {/* Card 2 */}
          <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleClick("/oop")}
          >
            <div className="relative">
              <img
                alt="Illustration of a computer, books, and a graduation cap"
                className="w-full h-48 object-cover"
                height="400"
                src="oop2.jpg"
                width="600"
              />
              
            </div>
            <div className="p-4">
              <h2 className="text-blue-600 font-semibold">
              Object Oriented Programming
              </h2>
            </div>
          </div>

          {/* Card 3 */}
          <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleClick("/maths2")}
          >
            <div className="relative">
              <img
                alt="Illustration of a computer, books, and a graduation cap"
                className="w-full h-48 object-cover"
                height="400"
                src="maths2.jpg"
              />
              
            </div>
            <div className="p-4">
              <h2 className="text-blue-600 font-semibold">
              Mathematics - II 
              </h2>
            </div>
          </div>

          {/* Card 4 */}
           <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleClick("/phy2")}
          >
            <div className="relative">
              <img
                alt="Illustration of a computer, books, and a graduation cap"
                className="w-full h-48 object-cover"
                height="400"
                src="phy2.jpg"
                width="600"
              />
              
            </div>
            <div className="p-4">
              <h2 className="text-blue-600 font-semibold">
              Physics
              </h2>
            </div>
          </div> 

          {/* Card 5 */}
           <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleClick("/eg2")}
          >
            <div className="relative">
              <img
                alt="Illustration of a computer, books, and a graduation cap"
                className="w-full h-48 object-cover"
                height="400"
                src="eg.jpg"
                width="600"
              />
              
            </div>
            <div className="p-4">
              <h2 className="text-blue-600 font-semibold">
              Engineering Graphics
              </h2>
            </div>
          </div> 

           {/* Card 7 */}
           <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleClick("/oat")}
          >
            <div className="relative">
              <img
                alt="Illustration of a computer, books, and a graduation cap"
                className="w-full h-48 object-cover"
                height="400"
                src="oat.jpg"
                width="600"
              />
              
            </div>
            <div className="p-4">
              <h2 className="text-blue-600 font-semibold">
              Office Automation Tools
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sem2;
