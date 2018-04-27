import React, { Component } from 'react';
//import { UploadField } from '@navjobs/upload';
import Dropzone from 'react-dropzone';

class Upload extends Component {
  constructor() {
		super();		
		this.state = {
      currentImageString: [],
      errorImage: '',
		}
	} 

	onUpload = (files) => {
   const uploaders = files.map(file => {
    for (var i=0; i<files.length; i++) {   
        const reader = new FileReader()
		    const file = files[i]
        console.log(file)
        const file_name = file["name"]
        console.log(file_name)
        const file_extension = file_name.split('.').pop();
        console.log(file_extension)
        if (file_extension === 'jpg' || file_extension === 'jpeg'
            ||file_extension === 'png' || file_extension === "tiff" 
            || file_extension === "tif" || file_extension === "JPG") {
                reader.readAsDataURL(file);
		            reader.onloadend = () => {
			              this.setState({currentImageString:[{"name":file_name},{"bs64":reader.result}]});
                  console.log(this.state.currentImageString)  
                  this.props.onUploadChange(reader.result);
            }
	      } else {
          this.setState({errorImage:"Wrong file type, please choose an image"})
          console.log("wrong file type")
        }
    }
  })
  }

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
        
        <img value={this.state.currentImageString} 
                          height={'50%'}
                          width={'50%'}
            renderValue={selected => selected.join(',')}
        />
        <h2 style ={{color: "red"}}> 
            {this.state.errorImage} 
        </h2>
        
			</div>
		)
	}
}

export default Upload;
