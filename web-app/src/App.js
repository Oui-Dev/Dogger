import React from 'react';
import { Route, Routes } from "react-router-dom";
import './App.scss';
// Components
import Navbar from './Components/Molecules/Navbar/Navbar';
import Footer from './Components/Molecules/Footer';
// Pages
import Home from './Pages/Home';
import ProjectsList from './Pages/Projects/List';
import ProjectsAdd from './Pages/Projects/Add';
import ProjectsEdit from './Pages/Projects/Edit';
import ErrorsList from './Pages/Errors/List';
import ErrorsDetails from './Pages/Errors/Details';
import Profile from './Pages/Profile';

function App() {
  return (
    <div>
        <section className="min-h-screen">
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 mt-6 md:mt-8 lg:mt-10">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects">
                        <Route index element={<ProjectsList />} />
                        <Route path="add" element={<ProjectsAdd />} />
                        <Route path="edit/:id" element={<ProjectsEdit />} />
                    </Route>
                    <Route path="/errors">
                        <Route index element={<ErrorsList />} />
                        <Route path="details/:id" element={<ErrorsDetails />} />
                    </Route>
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </div>
        </section>
        <Footer />
    </div>
  );
}

export default App;
