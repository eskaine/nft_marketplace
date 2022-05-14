import React from 'react';
import { EthersProvider } from './utils/EthersProvider';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Footer from './components/Footer';

import './index.css';
import './styles/base.css';

function App() {
  return (
    <EthersProvider>
      <div className="App">
        <Navbar />
        <Main />
        <Footer />
      </div>
    </EthersProvider>
  );
}

export default App;
