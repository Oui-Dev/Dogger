import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Components
import Navbar from './Components/Molecules/Navbar/Navbar';
import Footer from './Components/Molecules/Footer';
// Pages
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Projects from './Pages/Projects';
import ErrorsList from './Pages/Errors';
import Profile from './Pages/Profile';

function App() {
    const isAuthenticated = () => {
        const token = localStorage.getItem('token');
        if (token) {
            return true;
        }
        return false;
    }

    return (
        <>
            { !isAuthenticated() &&
                <section>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                </section>
            }
            { isAuthenticated() &&
            <>
                <section className="min-h-screen">
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                    <Navbar />
                    <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8 mt-2 md:mt-4 lg:mt-6">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/errors" element={<ErrorsList />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </div>
                </section>
                <Footer />
            </>
            }
        </>
    );
}

export default App;
