import React from 'react';
import { Home } from './pages/home';
import { Header } from './components/header';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <div className="background-box main-content">
        <Home foo="hi"></Home>
      </div>
    </div>
  );
}

export default App;
