import React, { Component } from 'react';
import './App.css';
import Title from "./Title.js";
import Upload from "./Upload.js";
import Methods from "./Methods.js";
import Identifier from "./Identifier.js";
import Submit from "./Submit.js"

class App extends Component {
  render() {
    return (
      <div>
        <Title />
        <Upload />
        <Identifier />
        <Methods />
        <Submit />
      </div>
    );
  }
}

export default App;
