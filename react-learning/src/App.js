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
      "metrics":[],
      "processedImg":"",
      "originalImg":"",
      "duration":"",
      "timestamp":"",
      "export_file_type":"",
      "filename": "",
      "processingType":"",
      "img_extension":"",
      "imgPath":"",
    }
  }

  onUploadChange = (event) => {
    console.log(event);
    this.setState({"currentImageString":event})
  console.log(this.state.currentImageString[2])
  }

  onMethodsChange = (event) => {
	var method = event.target.value;
	method = method[0]
    this.setState({"methods":method});
  }

  onIdentifierChange = (event) => {
    this.setState({"Identifier":event.target.value}, () => {console.log(this.state.Identifier)}); 
  
  }

  onExportFileTypeChange = (event) => {
    this.setState({"export_file_type":event.target.value}, () => {
       // console.log(this.state.export_file_type);
  })
  }
    PostData = () => {
        if (this.state.currentImageString === undefined) {
            return []
        } else { 
        for (var i=0; i<this.state.currentImageString.length; i++) {
          (function(i) {

            var url = "http://127.0.0.1:5000/imageprocessor/original_image"
            
            var newImage = this.state.currentImageString[i];
            var newImage_bs64 = newImage.bs64.split('base64,');
            var originalImg = newImage_bs64[1];
            var img_extension = newImage_bs64[0];
            var img_name = newImage.name;
            console.log(img_name);
            console.log(img_extension);
            this.setState({"img_extension":img_extension});
            console.log(this.state.img_extension);
            
            var body = {
                "image_proc_type": this.state.methods,
                "file_name": this.state.Identifier + img_name,
                "base_64": originalImg,
                "export_file_type": this.state.export_file_type
            }
            console.log(body);
          
            axios.post(url, body).then(function (response) {
            console.log(response);
          }, function(error) {
            alert(error);
          });
      })(i);
    }
}
}

      GetData = () => {       
   var url = "http://127.0.0.1:5000/imageprocessor/original_image/getthedata/" + this.state.Identifier;
        axios.get(url).then( (response) => {
              console.log(response);
              console.log(response.status);
              this.setState({"filename":response.data.filename});
            console.log(response.data.filename);
            console.log(this.state.filename);
            this.setState({"timestamp":response.data.timestamp});
            console.log(this.state.timestamp);
            this.setState({"processingType":response.data.processing_type});
            console.log(this.state.processingType);
            this.setState({"metrics":response.data.metrics});
            console.log(this.state.metrics);
            var processedImg = [this.state.img_extension];
            console.log(this.state.img_extension);
            processedImg.push("base64,");
            console.log(processedImg);
            processedImg.push(response.data.base_64_processed);
            console.log(response.data.base_64_processed);
            console.log(processedImg);
            var img = processedImg.join("");
            this.setState({"processedImg":img});
            console.log(this.state.processedImg);
            this.setState({"duration":response.data.processing_duration});
            console.log(this.state.duration)
          })
            .catch(function (error) {
             console.log(error);
           });
       }
  
      
  
  createTable = () => {
    var tabledata = [];
    if (this.state.metrics[1] === undefined) {
         return [];
      } else {
        var min_max = this.state.metrics[1];
        console.log(min_max);
        var min = min_max[0];
        console.log(min);
        var max = min_max[1];
        console.log(max);
      }

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
            <TableCell> Minimum </TableCell>
            <TableCell> {min} </TableCell>
        </TableRow>
        <TableRow>
            <TableCell> Maximum </TableCell>
            <TableCell> {max} </TableCell>
        </TableRow>
        <TableRow>
            <TableCell> Average </TableCell>
            <TableCell> {this.state.metrics[2]} </TableCell>
        </TableRow>
        </div>
      );
    
    return tabledata;
  };

  DisplayImages = () => {
    var Images = this.state.currentImageString;
    var Img = [];
    if (this.state.currentImageString === undefined) {
        return [];
     } else {

    for (var i=0; i<this.state.currentImageString.length; i++) {
       // console.log(this.state.currentImageString.length);
       // console.log(this.state.currentImageString[0]);
       // console.log(this.state.currentImageString[1]);
        Img.push(
          <img src= {this.state.currentImageString[i].bs64} 
                height = {"50%"} 
                width = {"50%"}
          />
        )}
    return Img
  }}
  
  getUrl = () => {
    var imgPath = this.state.processedImg.replace(/^data:image\/[^;]+/,'data:application/octet-stream');
    this.setState({"imgPath":imgPath}, ()  => {window.open(this.state.imgPath)});
  }
  
  render() {
    var tabledata = this.createTable();
    var Img = this.DisplayImages();

    return (
      <div>
        <div>  
            <Title />
            <Upload onUploadChange={this.onUploadChange}/>
            <Identifier onIdentifierChange={this.onIdentifierChange} /> 
            <Methods onMethodsChange={this.onMethodsChange}/>
            
            <div> Choose a file type to download(.jpg, .tiff, .png) </div>
 
             <TextField
                 value={this.state.export_file_type}
                 onChange={this.onExportFileTypeChange}>
                 Please specify file type
            </TextField>
            <Button variant='raised'  onClick={this.PostData}> 
                Submit
            </Button>

           <div style={{marginTop: '30px', marginLeft: "100px"}}>
                Identifier: {this.state.Identifier}
            </div>

            <div style={{marginTop: '30px', marginLeft:"100px"}}> 
                Method requested: {this.state.methods} 
            </div>
            
            <h3> Enter Unique Identifier and Obtain Stored Data </h3> 
            <Button variant='raised' onClick={this.GetData}>
                Get Data
            </Button>

            <h2 style={{marginTop: '30px', marginLeft:"100px",
                            marginBottom:'30px'}}> 
                Original Image 
            </h2>
            
            <div> {Img} </div>

            <h2> Processed Image </h2>
            <img src={this.state.processedImg}
                height = {"50%"}
                width = {"50%"}
                />

            <div style={{marginTop: '30px'}}> 
                Picture Metrics 
            </div>
         </div>
        <Table>
                {tabledata}
        </Table>
        
        <Button variant='raised' onClick={this.getUrl}>
            Save
        </Button>
    </div>
    )
  }
}

