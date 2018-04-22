import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DropzoneComponent from 'react-dropzone-component';
import { UploadField } from '@navjobs/upload';
import Image from 'react-image-resizer';

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
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			console.log(reader.result);
			this.setState({currentImageString: reader.result});
		}
	}

  render() {

		return (
			<div>
				<h2>Upload your image</h2>	
				<UploadField onFiles={this.onUpload}>
					<div style={{
							backgroundColor: 'blue', 
							textAlign: 'center',
              marginLeft: "150px",
              marginTop: "10px",
          }}>
						Choose File
					</div>	
				</UploadField>
				
        <img src={this.state.currentImageString} 
                        height={'50%'}
                        width={'50%'}/>
			</div>
		)
	}
}

export default Upload;
