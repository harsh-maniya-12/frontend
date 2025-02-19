
import React from "react";
import { useNavigate } from "react-router-dom";

const Sem4 = () => {
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
            onClick={() => handleClick("/daa")}
          >
             {/*img  */}
            <div className="relative">
             
              <img
                alt="Illustration of a computer, books, and a graduation cap"
                className="w-full h-48 object-cover"
                height="400"
                src="daa.png"
                width="600"
              />
             
            </div>
            {/*text */}
            <div className="p-4">
              <h2 className="text-blue-600 font-semibold">
              Design and Analysis of Algorithm
              </h2>
            </div>
          </div>

          

          {/* Card 2 */}
          <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleClick("/python")}
          >
            <div className="relative">
              <img
                alt="Illustration of a computer, books, and a graduation cap"
                className="w-full h-48 object-cover"
                height="400"
                src="python.jpg"
                width="600"
              />
              
            </div>
            <div className="p-4">
              <h2 className="text-blue-600 font-semibold">
              Python Programming
              </h2>
            </div>
          </div>

          {/* Card 3 */}
          <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleClick("/flutter")}
          >
            <div className="relative">
              <img
                alt="Illustration of a computer, books, and a graduation cap"
                className="w-full h-48 object-cover"
                height="400"
                src="flutter.jpg"
              />
              
            </div>
            <div className="p-4">
              <h2 className="text-blue-600 font-semibold">
              Mobile Application Development using Flutter
              </h2>
            </div>
          </div>

          {/* Card 4 */}
           <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleClick("/os")}
          >
            <div className="relative">
              <img
                alt="Illustration of a computer, books, and a graduation cap"
                className="w-full h-48 object-cover"
                height="400"
                src="os.jpg"
                width="600"
              />
              
            </div>
            <div className="p-4">
              <h2 className="text-blue-600 font-semibold">
              Operating System
              </h2>
            </div>
          </div> 

          {/* Card 5 */}
           <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleClick("/ps")}
          >
            <div className="relative">
              <img
                alt="Illustration of a computer, books, and a graduation cap"
                className="w-full h-48 object-cover"
                height="400"
                src="ps.jpg"
                width="600"
              />
              
            </div>
            <div className="p-4">
              <h2 className="text-blue-600 font-semibold">
              Probability & Statistics
              </h2>
            </div>
          </div> 

           {/* Card 7 */}
           <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleClick("/pc")}
          >
            <div className="relative">
              <img
                alt="Illustration of a computer, books, and a graduation cap"
                className="w-full h-48 object-cover"
                height="400"
                src="pc.jpg"
                width="600"
              />
              
            </div>
            <div className="p-4">
              <h2 className="text-blue-600 font-semibold">
              Professional Communication - I
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};  

export default Sem4;
