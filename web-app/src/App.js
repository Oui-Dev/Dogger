import React from 'react';
import Navbar from './Components/Atoms/Navbar/Navbar';
import Footer from './Components/Atoms/Footer';
import './App.scss';

function App() {
  return (
    <div className="App">
        <section className="min-h-screen">
            <Navbar />
        </section>
        <Footer />
    </div>
  );
}

export default App;
