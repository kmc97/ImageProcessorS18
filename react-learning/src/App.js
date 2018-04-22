import React, { Component } from 'react';
import './App.css';
import Title from "./Title.js";
import Upload from "./Upload.js";
import Methods from "./Methods.js";
import Name from "./Name.js";
import Submit from "./Submit.js"

class App extends Component {
  render() {
    return (
      <div>
        <Title />
        <Upload />
        <Name />
        <Methods />
        <Submit />
      </div>
    );
  }
}

export default App;
