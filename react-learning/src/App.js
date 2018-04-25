import React, { Component } from 'react';
import './App.css';
import Title from "./Title.js";
import Upload from "./Upload.js";
import Methods from "./Methods.js";
import Identifier from "./Identifier.js";
import Submit from "./Submit.js"
import axios from 'axios';
import Button from 'material-ui/Button';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      "processedData":""}
  }

  onUploadChange = (event) => {
    this.setState({currentImageString:event});
    console.log(this.state.currentImageString)
  }

  onMethodsChange = (event) => {
    this.setState({methods:event.target.value});
    console.log(this.state.methods)
  }

  onIdentifierChange = (event) => {
    this.setState({Identifier:event.target.value});
    console.log(this.state.Identifier)
  }

   PostData = () => {
      var url = "http://0.0.0.0:5000/test"
      var body = {
          "Methods": this.state.methods,
          "Identifier": this.state.Identifier,
          "Picture": this.state.currentImageString
      }
     console.log(body)
      axios.post(url, body).then(function (response) {
            console.log(response);
          this.setState("processedData":response)})
          .catch(function (error) {
            console.log(error);
          });
      }
  

  render() {
    return (
      <div>
        <Title />
        <Upload onUploadChange={this.onUploadChange}/>
        <Identifier onIdentifierChange={this.onIdentifierChange}/>
        <Methods onMethodsChange={this.onMethodsChange}/>
        <Button variant='raised'  onClick={this.PostData}>
            Submit
        </Button>
      </div>
    );
  }
}

