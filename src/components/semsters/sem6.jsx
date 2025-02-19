
import React from "react";
import { useNavigate } from "react-router-dom";

const Sem5 = () => {
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
            onClick={() => handleClick("/ml")}
          >
             {/*img  */}
            <div className="relative">
             
              <img
                alt="Illustration of a computer, books, and a graduation cap"
                className="w-full h-48 object-cover"
                height="400"
                src="ml.jpg"
                width="600"
              />
             
            </div>
            {/*text */}
            <div className="p-4">
              <h2 className="text-blue-600 font-semibold">
              Machine Learning 
              </h2>
            </div>
          </div>

          

          {/* Card 2 */}
          <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleClick("/net2")}
          >
            <div className="relative">
              <img
                alt="Illustration of a computer, books, and a graduation cap"
                className="w-full h-48 object-cover"
                height="400"
                src="net2.jpg"
                width="600"
              />
              
            </div>
            <div className="p-4">
              <h2 className="text-blue-600 font-semibold">
              Advanced Dot Net
              </h2>
            </div>
          </div>

          {/* Card 3 */}
          <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleClick("/iot")}
          >
            <div className="relative">
              <img
                alt="Illustration of a computer, books, and a graduation cap"
                className="w-full h-48 object-cover"
                height="400"
                src="iot.jpg"
              />
              
            </div>
            <div className="p-4">
              <h2 className="text-blue-600 font-semibold">
              Internet of Things
              </h2>
            </div>
          </div>

          {/* Card 4 */}
           <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleClick("/csa")}
          >
            <div className="relative">
              <img
                alt="Illustration of a computer, books, and a graduation cap"
                className="w-full h-48 object-cover"
                height="400"
                src="csa.jpg"
                width="600"
              />
              
            </div>
            <div className="p-4">
              <h2 className="text-blue-600 font-semibold">
              Computer System Architecture 
              </h2>
            </div>
          </div> 

          {/* Card 5 */}
           <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleClick("/toc")}
          >
            <div className="relative">
              <img
                alt="Illustration of a computer, books, and a graduation cap"
                className="w-full h-48 object-cover"
                height="400"
                src="toc.png"
                width="600"
              />
              
            </div>
            <div className="p-4">
              <h2 className="text-blue-600 font-semibold">
              Theory of Computation
              </h2>
            </div>
          </div> 

           {/* Card 7 */}
           <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleClick("/co")}
          >
            <div className="relative">
              <img
                alt="Illustration of a computer, books, and a graduation cap"
                className="w-full h-48 object-cover"
                height="400"
                src="co.jpg"
                width="600"
              />
              
            </div>
            <div className="p-4">
              <h2 className="text-blue-600 font-semibold">
              Career Orientation
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};  

export default Sem5;
