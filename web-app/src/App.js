import React from 'react';
import { Route, Routes } from "react-router-dom";
// Components
import Navbar from './Components/Molecules/Navbar/Navbar';
import Footer from './Components/Molecules/Footer';
// Pages
import Home from './Pages/Home';
import ProjectsList from './Pages/Projects/List';
import ProjectsAdd from './Pages/Projects/Add';
import ProjectsEdit from './Pages/Projects/Edit';
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
                    <Route path="/projects">
                        <Route index element={<ProjectsList />} />
                        <Route path="add" element={<ProjectsAdd />} />
                        <Route path="edit/:id" element={<ProjectsEdit />} />
                    </Route>
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
