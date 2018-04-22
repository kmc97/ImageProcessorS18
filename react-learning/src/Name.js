import React from 'react';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';

var  styles = {
  "textField": {
    "marginLeft": "100px",
    "marginRight":"30px",
    "width": "200",
  },
};

export default class Name  extends React.Component {
  constructor() {
    super();
   this.state = {
        "nameTextField": ''
    };
  }

  handleChange = nameTextField => event => {
    this.setState({
      [nameTextField]: event.target.value,
    });
  };

  render() {

    return (
      <div>
        <div> 
            Please Enter a Unique Identifier 
        </div>
        <TextField>
            id="required"
            label="Required"
            value={this.state.nameTextField}
            onChange={this.handleChange('')}
            margin="normal"
        </TextField>
      </div>
    )
  }
}
