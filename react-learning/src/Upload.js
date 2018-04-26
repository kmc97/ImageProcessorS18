import React, { Component } from 'react';
import { UploadField } from '@navjobs/upload';
import Dropzone from 'react-dropzone';

class Upload extends Component {
  constructor() {
		super();		
		this.state = {
      currentImageString: '',
      errorImage: '',
		}
	} 

	onUpload = (files) => {
        const reader = new FileReader()
		    const file = files[0]
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
			              console.log(reader.result);
			              this.setState({currentImageString: reader.result});
                    this.props.onUploadChange(reader.result);
            }
	      } else {
          this.setState({errorImage:"Wrong file type, please choose an image"})
          console.log("wrong file type")
        }
  
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
            mutliple={true}
            accept="image/*"
            onDrop={this.onImageDrop.bind(this)}
            >
            <div> Drop an image or click to select a file to upload</div>
        </Dropzone>

        <UploadField onFiles={this.onUpload}>
						Choose File
				</UploadField>
        <img src={this.state.currentImageString} 
                        height={'50%'}
                        width={'50%'}
      />
        <h2 style ={{color: "red"}}> 
            {this.state.errorImage} 
        </h2>
			</div>
		)
	}
}

export default Upload;
