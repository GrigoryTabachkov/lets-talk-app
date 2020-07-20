import React from 'react';
import './App.css';
import MapContainer from './components/Map/MapContainer.jsx';
// import TalkPerson from './components/TalkPerson/TalkPerson.jsx';

function App() {
  return (
    <div className="App">
      <h1>Let`s talk</h1>
      {/* <TalkPerson /> */}
      <MapContainer />
    </div>
  );
}

export default App;
