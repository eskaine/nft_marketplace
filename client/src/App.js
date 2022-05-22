import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Main from './components/Main';
import UserHome from './components/pages/UserHome';
import Footer from './components/Footer';
import { EthersContext } from './utils/EthersProvider';

import './index.css';
import './styles/base.css';

function App() {
  const { userAccount } = useContext(EthersContext);

  return (
    <div className="App">
      <div className="container mx-auto">
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="user" element={userAccount ? <Navigate to="/" /> : <UserHome header="My NFT List" />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
