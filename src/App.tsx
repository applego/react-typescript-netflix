// import React from 'react';
import { Row } from './components/Row';
import './App.css';
import { requests } from './request';

function App() {
  return (
    <div className='App'>
      <Row
        title='NETFLIX ORIGINALS'
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
    </div>
  );
}

export default App;
