import React, { Component } from 'react';
import './App.css';
import Title from "./Title.js";
import Upload from "./Upload.js";
import Methods from "./Methods.js";
//import Identifier from "./Identifier.js";
import axios from 'axios';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      "Identifier":"",
      "OriginalImg": "",
      "Methods":[],
      "Historgram":"",
      "Contrast":"",
      "Log":"",
      "Reverse":""
    }
  }

  onUploadChange = (event) => {
    this.setState({"currentImageString":event});
    console.log(this.state.currentImageString)
  }

  onMethodsChange = (event) => {
    this.setState({"methods":event.target.value});
    console.log(this.state.methods)
  }

  onIdentifierChange = (event) => {
    this.setState({"Identifier":event.target.value});
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
        this.setState({"Identifier":response.data.Identifier})
        this.setState({"Methods": response.data.Method})
        this.setState({"OriginalImg": response.data.OriginalImg})
        this.setState({"Histogram": response.data.Histogram})
        this.setState({"Contrast": response.data.Contrast})
        this.setState({"Log": response.data.log})
        this.setState({"Reverse": response.data.reverse})
      })
          .catch(function (error) {
            console.log(error);
          });
      }
  

  render() {
    return (
      <div>
        <Title />
        <Upload onUploadChange={this.onUploadChange}/>
        <img src={this.state.currentImageString}/>
        <div style={{
            textAlign:"center",
            marginLeft:"100px",
            marginTop:"10px"}}>
            <div> Please Enter a Unique Identifier </div>
            <TextField>
                value={this.state.Identifier}
                onChange={this.onIdentifierChange}
            </TextField>
        </div>

        <Methods onMethodsChange={this.onMethodsChange}/>
        <Button variant='raised'  onClick={this.PostData}>
            Submit
        </Button>
        <div>
            {this.state.Identifier}
            {this.state.Methods}
            {this.state.OriginalImg}
            {this.state.Histogram}
            {this.state.Contrast}
            {this.state.Log}
            {this.state.Reverse}
        </div>
      </div>
    );
  }
}

