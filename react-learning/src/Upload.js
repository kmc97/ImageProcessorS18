import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class Upload extends Component {
  constructor() {
		super();		
		this.state = {
      "currentImageString": '',
     "errorImage": '',
		}
	} 

	onUpload = (files) => {
  //  for (var i=0; i<files.length; i++) {   
        const reader = new FileReader()
		    const file = files[0];
        console.log(file);
        const file_name = file["name"];
        console.log(file_name);
        const file_extension = file_name.split('.').pop();
        console.log(file_extension);
        reader.readAsDataURL(file);
		    reader.onloadend = () => {
          //  var newImage = this.state.currentImageString;
         //   newImage.push({"name":file_name, "bs64":reader.result});
            var newImage = reader.result;
            console.log(newImage);
			      this.setState({"currentImageString": newImage});
            console.log(this.state.currentImageString);  
            this.props.onUploadChange(newImage);
            }
    }
 // }

  render() {

		return (
			<div style={{
                textAlign: 'center',
                marginLeft: "100px",
                marginTop: "10px",
        }}> 
				<h2>Upload your image</h2>	
        <Dropzone
              onDrop={this.onUpload}
              multiple
              accept="image/*"
              >
              <div> Drop your files or click to upload </div>
        </Dropzone>
        
        <h2 style ={{color: "red"}}> 
            {this.state.errorImage} 
        </h2>
        
			</div>
		)
	}
}

export default Upload;
