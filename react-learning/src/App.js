import React, { Component } from 'react';
import './App.css';
import Title from "./Title.js";
//import Image from "./Images.js";
import Upload from "./Upload.js";

class App extends Component {
  render() {
    return (
      <div>
        <Title />
        <Upload />
      </div>
    );
  }
}

export default App;
