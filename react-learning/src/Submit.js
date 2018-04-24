import React from 'react';
import Button from 'material-ui/Button';
import Methods from './Methods.js';
import Identifier from './Identifier.js';
import Upload from './Upload.js';
import axios from 'axios';

export default class Submit extends React.Component {
  constructor() {
    super();
    this.state = {
      "processedData":""};
  }

  PostData = () => {
    var url = "http://0.0.0.0:5000/test"
    var body = {
        "Methods": this.props.methods,
        "Identifier": this.props.Identifier,
        "Picture": this.props.currentImageString
    }
    axios.post(url, body)
        .then(function (response) {
          console.log(response);
        })
        this.setState("processedData":response)
        .catch(function (error) {
          console.log(error);
        });
    }
  
  render() {
   return (
     <Button variant="raised">
        <div style = {{
          marginLeft: "150px",
          marginTop: "10px"
        }}
        onClick={this.PostData}>
            Submit Image
        </div>
     </Button>
   )
 }
}

