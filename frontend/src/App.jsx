import React from 'react';
import './App.css';
import Map from './components/Map/Map.jsx';
import TalkPerson from './components/TalkPerson/TalkPerson.jsx';

function App() {
  return (
    <div className="App">
      <h1>Let`s talk</h1>
      <TalkPerson />
      <Map />
    </div>
  );
}

export default App;
