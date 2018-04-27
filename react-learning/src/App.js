import React, { Component } from 'react';
import './App.css';
import Title from "./Title.js";
import Upload from "./Upload.js";
import Methods from "./Methods.js";
import Identifier from "./Identifier.js";
import axios from 'axios';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Table, { TableCell, TableHead, TableRow} from 'material-ui/Table';


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      "Identifier_back":"",
      "OriginalImg": "",
      "Methods":"",
      "metrics":"",
      "processedImg":""
    }
  }

  onUploadChange = (event) => {
    this.setState({"currentImageString":event});
//    console.log(this.state.currentImageString)
  }

  onMethodsChange = (event) => {
    this.setState({"methods":event.target.value});
    console.log(this.state.methods)
  }

  onIdentifierChange = (event) => {
    this.setState({"Identifier":event.target.value}, () => {console.log(this.state.Identifier)}); 
  }

  PostData = () => {
      var url = "http://0.0.0.0:5000/imageprocessor/processed_image"
      var body = {
        "image_proc_type": this.state.methods,
        "file_name": this.state.Identifier,
        "base64_image": this.state.currentImageString
      }
     console.log(body)
      console.log(this.state.Identifier);
      axios.post(url, body).then( (response) => {
        console.log(response)
        console.log(response.data)
        console.log(response.data.file_name)
        this.setState({Identifier_back: response.data.file_name})
        /*
        this.setState({Methods: response.data.image_proc_type[1]})
        this.setState({OriginalImg: response.data.base64_image})
        */
        this.setState({metrics: response.data.metrics})
        this.setState({timestamp: response.data.timestamp})
        this.setState({duration: response.data.duration})
        this.setState({processedImg: response.data.base64_proc})
      
      })
          .catch(function (error) {
            console.log(error);
          });
      }
  
  createTable = () => {
    var tabledata = [];
      tabledata.push(
        <div>
        <TableRow>
            <TableCell> Time Stamp </TableCell>
            <TableCell> {this.state.timestamp} </TableCell>
        </TableRow>
        <TableRow>
            <TableCell> Duration </TableCell>
            <TableCell> {this.state.duration} </TableCell>
        </TableRow>
        <TableRow>
            <TableCell> Pixels  </TableCell>
            <TableCell> {this.state.metrics[0]} </TableCell>
        </TableRow>
        <TableRow>
            <TableCell> Geometry </TableCell>
            <TableCell> {this.state.metrics[1]} </TableCell>
        </TableRow>
        <TableRow>
            <TableCell> Min - Max </TableCell>
            <TableCell> {this.state.metrics[2]} </TableCell>
        </TableRow>
        <TableRow>
            <TableCell> Average </TableCell>
            <TableCell> {this.state.metrics[3]} </TableCell>
        </TableRow>
        </div>
      );
    
    return tabledata;
  };


  render() {
    var tabledata = this.createTable();

    return (
        <div>
        <Title />
        <Upload onUploadChange={this.onUploadChange}/>
        <div style={{
            textAlign:"center",
            marginLeft:"100px",
            marginTop:"10px"}}>
            <div> Please Enter a Unique Identifier </div>
            <TextField
                value={this.state.Identifier}
                onChange={this.onIdentifierChange}>
            </TextField>
        </div>
        <Methods onMethodsChange={this.onMethodsChange}/>
        <Button variant='raised'  onClick={this.PostData}>
            Submit
        </Button>
        <div1> Unique Identifier: {this.state.Identifier} </div1>
        <div2> Method requested: {this.state.Methods} </div2>
        <div3> Original Image </div3>
        <img src={this.state.currentImageString}>
        <div> Picture Metrics </div>
        <Table>
                <TableHead>
                    <TableRow>
                        <TableCell> Metrics </TableCell>
                    </TableRow>
                </TableHead>
                {tabledata}
        </Table>
    </div>
    );
  }
}

