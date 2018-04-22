import React from 'react';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';

var  styles = {
  "textField": {
    "marginLeft": "100px",
    "marginRight":"30px",
    "marginTop":"50px",
    "width": "200",
  },
};

export default class Identifier  extends React.Component {
  constructor() {
    super();
   this.state = {
        "Identifier": ''
    };
  }

  handleChange = identifier => event => {
    this.setState({
      "Identifier": event.target.value,
    });
  };

  render() {

    return (
      <div style={{
        marginLeft: "100px",
        marginTop: "50px"
      }}>
        <div> 
            Please Enter a Unique Identifier 
        </div>
        <TextField>
            id="required"
            label="Required"
            value={this.state.identifier}
            onChange={this.handleChange}
            margin="normal"
        </TextField>
      </div>
    )
  }
}
