import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Footer from './components/Footer';

import './index.css';
import './styles/base.css';

function App() {
  return (
    <div className="App">
      <div className="container mx-auto">
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          {/* <Route path="about" element={<About />} /> */}
        </Routes>

        <Footer />
      </div>
    </div>
  );
}

export default App;
