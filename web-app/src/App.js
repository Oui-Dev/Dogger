import React from 'react';
import { Route, Routes } from "react-router-dom";
import './App.scss';
// Components
import Navbar from './Components/Atoms/Navbar/Navbar';
import Footer from './Components/Atoms/Footer';
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
    <div className="App">
        <section className="min-h-screen">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<ProjectsList />} />
                <Route path="/projects/add" element={<ProjectsAdd />} />
                <Route path="/projects/edit" element={<ProjectsEdit />} />
                <Route path="/errors" element={<ErrorsList />} />
                <Route path="/errors/details" element={<ErrorsDetails />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </section>
        <Footer />
    </div>
  );
}

export default App;
