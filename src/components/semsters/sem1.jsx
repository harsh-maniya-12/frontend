
import React from "react";
import { useNavigate } from "react-router-dom";

const Sem1 = () => {
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
            onClick={() => handleClick("/sem1data")}
          >
             {/*img  */}
            <div className="relative">
             
              <img
                alt="Illustration of a computer, books, and a graduation cap"
                className="w-full h-48 object-cover"
                height="400"
                src="c2.png"
                width="600"
              />
             
            </div>
            {/*text */}
            <div className="p-4">
              <h2 className="text-blue-600 font-semibold">
              computer programming using c
              </h2>
            </div>
          </div>

          

          {/* Card 2 */}
          <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleClick("/wd")}
          >
            <div className="relative">
              <img
                alt="Illustration of a computer, books, and a graduation cap"
                className="w-full h-48 object-cover"
                height="400"
                src="wd.jpg"
                width="600"
              />
              
            </div>
            <div className="p-4">
              <h2 className="text-blue-600 font-semibold">
                Web Designing
              </h2>
            </div>
          </div>

          {/* Card 3 */}
          <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleClick("/english")}
          >
            <div className="relative">
              <img
                alt="Illustration of a computer, books, and a graduation cap"
                className="w-full h-48 object-cover"
                height="400"
                src="english.jpg"
              />
              
            </div>
            <div className="p-4">
              <h2 className="text-blue-600 font-semibold">
                English
              </h2>
            </div>
          </div>

          {/* Card 4 */}
           <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleClick("/phy")}
          >
            <div className="relative">
              <img
                alt="Illustration of a computer, books, and a graduation cap"
                className="w-full h-48 object-cover"
                height="400"
                src="foe.jpg"
                width="600"
              />
              
            </div>
            <div className="p-4">
              <h2 className="text-blue-600 font-semibold">
              Fundamental of Electronics
              </h2>
            </div>
          </div> 

          {/* Card 5 */}
           <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleClick("/maths")}
          >
            <div className="relative">
              <img
                alt="Illustration of a computer, books, and a graduation cap"
                className="w-full h-48 object-cover"
                height="400"
                src="math.jpg"
                width="600"
              />
              
            </div>
            <div className="p-4">
              <h2 className="text-blue-600 font-semibold">
                Mathematics
              </h2>
            </div>
          </div> 

           {/* Card 7 */}
           <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleClick("/eg")}
          >
            <div className="relative">
              <img
                alt="Illustration of a computer, books, and a graduation cap"
                className="w-full h-48 object-cover"
                height="400"
                src="eh.jpg"
                width="600"
              />
              
            </div>
            <div className="p-4">
              <h2 className="text-blue-600 font-semibold">
                 Environmental Studies 
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sem1;
