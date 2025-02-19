
import React from "react";
import { useNavigate } from "react-router-dom";

const Sem3 = () => {
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
            onClick={() => handleClick("/dsa")}
          >
             {/*img  */}
            <div className="relative">
             
              <img
                alt="Illustration of a computer, books, and a graduation cap"
                className="w-full h-48 object-cover"
                height="400"
                src="dsa.png"
                width="600"
              />
             
            </div>
            {/*text */}
            <div className="p-4">
              <h2 className="text-blue-600 font-semibold">
              Data Structure
              </h2>
            </div>
          </div>

          

          {/* Card 2 */}
          <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleClick("/dbms2")}
          >
            <div className="relative">
              <img
                alt="Illustration of a computer, books, and a graduation cap"
                className="w-full h-48 object-cover"
                height="400"
                src="dbms2.jpg"
                width="600"
              />
              
            </div>
            <div className="p-4">
              <h2 className="text-blue-600 font-semibold">
              Database Management System - II
              </h2>
            </div>
          </div>

          {/* Card 3 */}
          <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleClick("/wt")}
          >
            <div className="relative">
              <img
                alt="Illustration of a computer, books, and a graduation cap"
                className="w-full h-48 object-cover"
                height="400"
                src="wt.jpg"
              />
              
            </div>
            <div className="p-4">
              <h2 className="text-blue-600 font-semibold">
              Web Technology 
              </h2>
            </div>
          </div>

          {/* Card 4 */}
           <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleClick("/digital")}
          >
            <div className="relative">
              <img
                alt="Illustration of a computer, books, and a graduation cap"
                className="w-full h-48 object-cover"
                height="400"
                src="digital.jpg"
                width="600"
              />
              
            </div>
            <div className="p-4">
              <h2 className="text-blue-600 font-semibold">
              Digital Fundamentals
              </h2>
            </div>
          </div> 

          {/* Card 5 */}
           <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleClick("/dmaths")}
          >
            <div className="relative">
              <img
                alt="Illustration of a computer, books, and a graduation cap"
                className="w-full h-48 object-cover"
                height="400"
                src="dmaths.jpg"
                width="600"
              />
              
            </div>
            <div className="p-4">
              <h2 className="text-blue-600 font-semibold">
              Discrete Mathematics
              </h2>
            </div>
          </div> 

           {/* Card 7 */}
           <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleClick("/ic")}
          >
            <div className="relative">
              <img
                alt="Illustration of a computer, books, and a graduation cap"
                className="w-full h-48 object-cover"
                height="400"
                src="ic.jpg"
                width="600"
              />
              
            </div>
            <div className="p-4">
              <h2 className="text-blue-600 font-semibold">
              Indian Constitution
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sem3;
