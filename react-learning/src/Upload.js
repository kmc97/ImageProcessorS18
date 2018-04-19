import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DropzoneComponent from 'react-dropzone-component';
import { UploadField } from '@navjobs/upload';
import Image from 'react-image-resizer';

var styles = {
    "imageStyle":{
    "imageSize": "20% 20%",
  }
 }

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
    var typ=document.getElementById("{this.state.currentImageString}").value;
    var res = type.match(".jpg");

		return (
			<div>
				<h2>Upload your image</h2>	
				<UploadField onFiles={this.onUpload}>
					<div style={{
							backgroundColor: 'blue', 
							width:'120px', 
							height:'20px',
							textAlign: 'center',
              marginLeft: "100px",
              marginTop: "50px"
          }}>
						Choose File
					</div>	
				</UploadField>
				
        <script>
            try
                {<img src={this.state.currentImageString} 
                        height={'50%'}
                        width={'50%'}/>
                }
            catch(e)
            {
                document.getElementById
                {
                  alert("Wrong file type: please upload a picture");
                }
        </script>
			</div>
		)
	}
}

export default Upload;
