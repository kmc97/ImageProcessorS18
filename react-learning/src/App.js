import React, { Component } from 'react';
import './App.css';
import Title from "./Title.js";
import Upload from "./Upload.js";
import Methods from "./Methods.js";
import Identifier from "./Identifier.js";
import axios from 'axios';
import Button from 'material-ui/Button';
import Table, { TableCell, TableRow} from 'material-ui/Table';
import TextField from "material-ui/TextField";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      "metrics":"",
      "processedImg":"",
      "originalImg":"",
      "duration":"",
      "timestamp":"",
      "export_file_type":""
    }
  }

  onUploadChange = (event) => {
    console.log(event);
    this.setState({"currentImageString":event})
  console.log(this.state.currentImageString)
  }

  onMethodsChange = (event) => {
    this.setState({"methods":event.target.value});
  }

  onIdentifierChange = (event) => {
    this.setState({"Identifier":event.target.value}, () => {console.log(this.state.Identifier)}); 
  
  }

  onExportFileTypeChange = (event) => {
    this.setState({"export_file_type":event.target.value}, () => {
        console.log(this.state.export_file_type);
  })
  }
    PostData = () => {
        var url = "http://127.0.0.1:5000/imageprocessor/original_image"
          var body = {
              "image_proc_type": this.state.methods,
              "file_name": this.state.Identifier,
              "base_64": this.state.currentImageString,
              "export_file_type": this.state.export_file_type
          }
          console.log(body);
          axios.post(url, body).then( (response) => {
            console.log(response);
          })
      }
  
      GetData = () => {       
 //  var url = "http://127.0.0.1:5000/imageprocessor/original_image/getthedata/" + this.state.Identifier;
       var url = "http://127.0.0.1:5000/imageprocessor/original_image/getthedata/noor"   
        axios.get(url).then( (response) => {
              console.log(response);
              console.log(response.status);
              this.setState({"data":response});
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
/*
  DisplayImages = () => {
    var Images = this.state.currentImageString;
    var Img = [];
    
    for (var i=0; i<this.state.currentImageString.length; i++) {

    return Img
  }
  */
  render() {
    var tabledata = this.createTable();
    
    return (
       <div>
        <div>  
            <Title />
            <Upload onUploadChange={this.onUploadChange}/>
            <Identifier onIdentifierChange={this.onIdentifierChange} /> 
            <Methods onMethodsChange={this.onMethodsChange}/>
            
            
            <Button variant='raised'  onClick={this.PostData}> 
                Submit
            </Button>

           <div style={{marginTop: '30px', marginLeft: "100px"}}>
                Identifier: {this.state.Identifier}
            </div>

            <div style={{marginTop: '30px', marginLeft:"100px"}}> 
                Method requested: {this.state.methods} 
            </div>

            <TextField
                value={this.state.export_file_type}
                onChange={this.onExportFileTypeChange}>
                Please specify file type 
            </TextField>
            
            <Button variant='raised' onClick={this.GetData}>
                Get Data
            </Button>

            <div style={{marginTop: '30px', marginLeft:"100px",
                            marginBottom:'30px'}}> 
                Original Image 
            </div>
            <img src= {Image}
                height = {'50%'}
                width = {'50%'}
                />
            <div style={{marginTop: '30px'}}> 
                Picture Metrics 
            </div>
         </div>
        <Table>
                {tabledata}
        </Table>
    </div>
    )
  }
}

