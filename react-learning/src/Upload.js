import React, { Component } from 'react';
import { UploadField } from '@navjobs/upload';

class Upload extends Component {
	constructor() {
		super();		
		this.state = {
			currentImageString: '',
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
    if (file_extension === 'jpg' || file_extension === 'png') {
        reader.readAsDataURL(file);
		    reader.onloadend = () => {
			  console.log(reader.result);
			  this.setState({currentImageString: reader.result});
        this.props.onUploadChange(reader.result);
            }
	      } else {
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
				<UploadField onFiles={this.onUpload}>
						Choose File
				</UploadField>
        <img src={this.state.currentImageString} 
                        height={'50%'}
                        width={'50%'}
      />
			</div>
		)
	}
}

export default Upload;
