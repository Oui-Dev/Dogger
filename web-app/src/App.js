import React from 'react';
import { Route, Routes } from "react-router-dom";
// Components
import Navbar from './Components/Molecules/Navbar/Navbar';
import Footer from './Components/Molecules/Footer';
// Pages
import Home from './Pages/Home';
import Projects from './Pages/Projects';
import ErrorsList from './Pages/Errors';
import Profile from './Pages/Profile';

function App() {
  return (
    <>
        <section className="min-h-screen">
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 mt-6 md:mt-8 lg:mt-10">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/errors" element={<ErrorsList />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </div>
        </section>
        <Footer />
    </>
  );
}

export default App;
