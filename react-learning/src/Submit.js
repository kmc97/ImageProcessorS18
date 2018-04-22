import React from 'react';
import Button from 'material-ui/Button';
import Methods from './Methods.js';
import Identifier from './Identifier.js';
import Upload from './Upload.js';

export default class Submit extends React.Component {
/*
  PostData = () => {
    var url = ""
    var body = {
      Methods: {this.state.Methods},
      Identifier: {this.state.Identifier},
      Picture: {this.state.currentImageString}
    }
    axios({
      method: 'post',
      url: '',
      data: body
        }).then(function (response) {
            console.log(response);})
        .catch(function (response) {
            console.log(response);
            });
    }
*/
  render() {
   return (
     <Button variant="raised">
        <div>
            Submit Image
        </div>
     </Button>
   )
 }
}

