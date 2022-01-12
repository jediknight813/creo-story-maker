import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Components/Header'
import CreoStoryMaker from './Components/CreoStoryMaker'

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <CreoStoryMaker />
  </React.StrictMode>,
  document.getElementById('root')
);

