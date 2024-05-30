// App.js

import React from 'react';
import WebcamComponent from './components/access_webcam';

const App = () => {
  return (
    <div className="App flex flex-col items-center min-h-screen bg-gray-900">
      <h1 className="text-center text-5xl font-bold mt-4 p-2 bg-gray-800 text-white rounded-lg">Proctoring Tool</h1>
      <WebcamComponent />
    </div>
  );
};

export default App;
