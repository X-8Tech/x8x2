import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const WelcomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/'); // or '/' if your Home is at root
    }, 8000); // 2.5 seconds splash screen

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-500 text-white">
      <img
        src={logo}
        alt="KUHA BITES Logo"
        className="w-28 h-28 rounded-full mb-6 shadow-lg animate-bounce"
      />
      <h1 className="text-3xl md:text-5xl font-bold tracking-widest animate-fadeIn">KUHA BITES</h1>
      <p className="mt-4 text-lg font-light animate-fadeIn delay-500">Deliciousness on the way... 🍽️</p>
    </div>
  );
};

export default WelcomePage;
