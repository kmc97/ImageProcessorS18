import React, { Component } from 'react';
import './App.css';
import Title from "./Title.js";
import Upload from "./Upload.js";
import Methods from "./Methods.js";
import Identifier from "./Identifier.js";
import axios from 'axios';
import Button from 'material-ui/Button';
import Table, { TableCell, TableRow, TableHead, TableBody} from 'material-ui/Table';
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
      "imgNames":[],
      "processedData":[]
    }
  }

  onUploadChange = (event) => {
    console.log(event);
    this.setState({"currentImageString":event})
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
          try{throw i}
          catch(ii) {
            var url = "http://127.0.0.1:5000/imageprocessor/original_image";
            var Img = {};
            var Img  = this.state.currentImageString[ii];
           // console.log(ii);
            console.log(Img);
            var Img_bs64 = Img.bs64;
            Img_bs64 = Img_bs64.split('base64,');
            var originalImg = Img_bs64[1];
            var img_extension = Img_bs64[0];
            console.log(img_extension);
            var imgName = this.state.Identifier + Img.name;
            var imgNames = [];
            imgNames = this.state.imgNames;
            imgNames.push(imgName);
            this.setState({"imgNames":imgNames});
            console.log(this.state.imgNames);
            this.setState({"img_extension":img_extension}, () => {console.log(this.state.img_extension)}); 
            var body = {
                "image_proc_type": this.state.methods,
                "file_name": imgName,
                "base_64": originalImg,
                "export_file_type": this.state.export_file_type
            }
            console.log(body);
          
            axios.post(url, body).then( (response) => {
            console.log(response);
          });
            }}
    }
}


      GetData = () => {
        if (this.state.currentImageString === undefined) {
          return []
        } else {
          for (var i=0; i<this.state.imgNames.length; i++) {
            try{throw i}
            catch(j) {
            console.log(this.state.imgNames);
            var url = "http://127.0.0.1:5000/imageprocessor/original_image/getthedata/" + this.state.imgNames[j]
            axios.get(url).then( (response) => {
                console.log(response);
                console.log(response.status);
                console.log(response.data);
                var newData = [];
                var newData = this.state.processedData;
                newData.push(response.data)
                this.setState({"processedData":newData});
                console.log(this.state.processedData);
                
          })
            .catch(function (error) {
             console.log(error);
           });
       }}}}
  
      
  

  createTable = () => {
    if (this.state.processedData === undefined) {
      return [];
      } else {
       /* for (var i=0; i<this.state.processedData.length; i++){
            console.log(this.state.processedData.length);
            var data = this.state.processedData[i];
            var metrics = data.metrics;
            console.log(metrics);

            var timestamp = data.timestamp;
            var duration = data.processing_duration;
            var filename = data.filename;

            var tabledata = [];
            if (metrics[1] === undefined) {
                return [];
            } else {
                var min_max = metrics[1];
                var min = min_max[0];
                var max = min_max[1];
            }
    */
        var tabledata = [];
    tabledata.push(
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell> Metrics  </TableCell>
                    
                    {this.state.processedData.map(element => {
                          return ( 
                            <TableCell> {element.filename} </TableCell>
                        )
                        })
                    }
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                     <TableCell> Time Stamp  </TableCell> 
                     {this.state.processedData.map(element => {
                           return (
                             <TableCell> {element.timestamp} </TableCell>
                         )
                         })
                     }
                 </TableRow>
                
                <TableRow>
                    <TableCell> Processing Duration </TableCell>
                    {this.state.processedData.map(element => {
                        return (
                          <TableCell> {element.processing_duration} </TableCell>
                    )})}
                </TableRow>

                <TableRow>
                      <TableCell> Pixels </TableCell>
                      {
                        this.state.processedData.map(element => {
                        return (
                          <TableCell> {element.metrics[0]} </TableCell>
                      )})}
                </TableRow>
                
                <TableRow>
                        <TableCell> Average </TableCell>
                        {this.state.processedData.map(element => {
                          return (
                            <TableCell> {element.metrics} </TableCell>
                        )})}
                </TableRow>

                <TableRow>
                        <TableCell> X dimension </TableCell>
                            {this.state.processedData.map(element => {
                          return (
                            <TableCell> {element.metrics} </TableCell>
                        )})}
                </TableRow>

                <TableRow> 
                          <TableCell> Y Dimension </TableCell>
                          {this.state.processedData.map(element => {
                            return (
                              <TableCell> {element.metrics} </TableCell>
                          )})}
                </TableRow>


            </TableBody>
        </Table>
      );
    
    return tabledata;
  }}
  

  DisplayOriginalImages = () => {
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

   DisplayProcessedImages = () => {
     if (this.state.processedData === undefined) {
       return [];
       } else {
         var P_Img = [];
         for (var i=0; i<this.state.processedData.length; i++) {
         console.log("data:image/" + this.state.export_file_type +
           ";base64,"+ this.state.processedData[i].base_64_processed);

           P_Img.push(
           <img src = {"data:image/" + this.state.export_file_type + ";base64,"
             + this.state.processedData[i].base_64_processed}
                 height = {"50%"}
                 width = {"50%"}
           />
         )}
     return P_Img
   }}
  
  getUrl = () => {
    if (this.state.processedData === undefined) {
        return [];
        } else {
          var imgPaths = [];
          for (var i=0; i<this.state.processedData.length; i++) {
            var img = this.state.processedData[i].base_64_processed;
            console.log(img);
            var imgPath = img.replace(/^data:image\/[^;]+/,'data:application/octet-stream');
            console.log(imgPath);
            imgPaths.push(imgPath)}
          for (var i=0; i<imgPaths.length; i++) {
            window.open(imgPaths[i])}
        }}
            


  render() {
    var tabledata = this.createTable();
    var OriginalImg = this.DisplayOriginalImages();
    var P_Img = this.DisplayProcessedImages();

    return (
      <div>
        <div>  
            <Title />
            <Upload onUploadChange={this.onUploadChange}/>
            <Identifier onIdentifierChange={this.onIdentifierChange} /> 
            <Methods onMethodsChange={this.onMethodsChange}/>
            
            <div> Choose a file type to download(.jpg or .png) </div>
 
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
            
            <div> {OriginalImg} </div>

            <h2> Processed Image </h2>
            <div> {P_Img} </div>

            <div style={{marginTop: '30px'}}> 
                Picture Metrics 
            </div>
         </div>
         <div> {tabledata} </div>
        
        
        <Button variant='raised' onClick={this.getUrl}>
            Save
        </Button>

        <Button id="download-btn" date-files={this.state.imgPath}> Download </Button>
    </div>
    )
  }
}

