import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:4001/app/v1/user/logout", {
        withCredentials: true,
      });
      toast.success("Logged out successfully!");
      localStorage.removeItem("authToken");
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.errors || "Error logging out");
    }
  };

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);

  const semesterRef = useRef(null);
  const universityRef = useRef(null);
  const gtuRef = useRef(null);
  const firstCardWidth = useRef(0);

  useEffect(() => {
    const firstCard = semesterRef.current?.querySelector(".card");
    if (firstCard) {
      firstCardWidth.current = firstCard.offsetWidth;
    }
  }, []);

  const dragStart = (e, ref) => {
    setIsDragging(true);
    setStartX(e.pageX || e.touches[0].pageX);
    setStartScrollLeft(ref.current.scrollLeft);
    ref.current.classList.add("dragging");
  };

  const dragging = (e, ref) => {
    if (!isDragging) return;
    ref.current.scrollLeft = startScrollLeft - (e.pageX || e.touches[0].pageX - startX);
  };

  const dragStop = (ref) => {
    setIsDragging(false);
    ref.current?.classList.remove("dragging");
  };

  const handleArrowClick = (direction, ref) => {
    ref.current.scrollLeft += direction === "left" ? -firstCardWidth.current * 3 : firstCardWidth.current * 3;
  };

  const renderCarousel = (ref, items, basePath) => (
    <div
      ref={ref}
      className="flex overflow-x-auto space-x-4 py-4 px-6 scrollbar-hide"
      onMouseDown={(e) => dragStart(e, ref)}
      onMouseMove={(e) => dragging(e, ref)}
      onMouseUp={() => dragStop(ref)}
      onMouseLeave={() => dragStop(ref)}
      onTouchStart={(e) => dragStart(e, ref)}
      onTouchMove={(e) => dragging(e, ref)}
      onTouchEnd={() => dragStop(ref)}
    >
      {items.map((item) => (
        <Link
          key={item.id}
          to={`/${basePath}${item.id}`}
          className="card w-40 h-40 bg-gray-700 text-white flex items-center justify-center rounded-lg shadow-lg hover:bg-gray-600"
        >
          {item.title}
        </Link>
      ))}
    </div>
  );

  const semesters = Array.from({ length: 7 }, (_, i) => ({ id: i + 1, title: `Semester ${i + 1}` }));

  return (
    <div className="bg-[#001f3f] min-h-screen">
      {/* Navbar */}
      <nav className="bg-[#001f3f] text-white flex items-center justify-between px-6 py-4 border-b border-yellow-300">
        <h2 className="text-3xl font-bold">Du<span className="text-yellow-300"> Material</span></h2>

        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8">
          {["Home", "Semester", "University Paper", "GTU Paper", "Network"].map((item) => (
            <li key={item} className="hover:underline cursor-pointer">{item}</li>
          ))}
        </ul>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <ul className="md:hidden absolute top-16 left-0 right-0 bg-[#001f3f] text-white text-center">
            {["Home", "Semester", "University Paper", "GTU Paper", "Network"].map((item) => (
              <li key={item} className="py-2 hover:bg-gray-700">{item}</li>
            ))}
          </ul>
        )}

        {/* Login/Logout Buttons */}
        <div className="hidden md:flex space-x-4">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Logout</button>
          ) : (
            <>
              <Link to="/signup" className="bg-white text-[#001f3f] px-4 py-2 rounded hover:bg-gray-200">Sign Up</Link>
              <Link to="/login" className="ml-4 border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-[#001f3f]">Login</Link>
            </>
          )}
        </div>
      </nav>

      {/* Carousel Sections */}
      {[
        { title: "Semesters", ref: semesterRef, items: semesters, path: "sem" },
        { title: "University Papers", ref: universityRef, items: semesters, path: "uni_paper_sem" },
        { title: "GTU Papers", ref: gtuRef, items: semesters, path: "gtu_paper_sem" },
      ].map(({ title, ref, items, path }) => (
        <section key={title} className="py-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Explore <span className="text-yellow-300">{title}</span>
          </h2>
          <div className="relative w-full max-w-screen-xl mx-auto">
            <button
              onClick={() => handleArrowClick("left", ref)}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white p-3 rounded-full hover:bg-gray-800"
            >
              &#10094;
            </button>
            {renderCarousel(ref, items, path)}
            <button
              onClick={() => handleArrowClick("right", ref)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white p-3 rounded-full hover:bg-gray-800"
            >
              &#10095;
            </button>
          </div>
        </section>
      ))}

      {/* Footer */}
      <footer className="bg-[#001f3f] text-white py-8 border-t border-yellow-400 text-center">
  <div className="max-w-screen-md mx-auto px-6">
    
    {/* Profile Image */}
    <div className="flex justify-center">
      <img 
        src="my.jpg" 
        alt="Mayniya Harsh" 
        className="w-24 h-24 rounded-full border-3 border-yellow-300 shadow-lg transition-transform transform hover:scale-105"
      />
    </div>

    {/* Name & Contact Info */}
    <h2 className="text-2xl font-bold text-yellow-400 mt-3 tracking-wide">
      Maniya Harsh
    </h2>

   

    {/* Contact Details */}
    <div className="mt-3 space-y-1">
      <p className="text-gray-300">
        Email: 
        <a href="mailto:maniyaharsh595@gmail.com" 
           className="text-yellow-300 hover:text-yellow-500 transition-colors duration-200 ml-1">
          maniyaharsh595@gmail.com
        </a>
      </p>
      
      <p className="text-gray-300">
        Phone: 
        <a href="tel:+917226930831" 
           className="text-yellow-300 hover:text-yellow-500 transition-colors duration-200 ml-1">
          +91 7226930831
        </a>
      </p>
    </div>

    {/* Copyright */}
    <p className="text-gray-400 text-xs mt-4 opacity-75">
      © {new Date().getFullYear()} Mayniya Harsh. All Rights Reserved.
    </p>
    
  </div>
</footer>







    </div>
  );
};

export default Home;