import React from 'react';
import TextField from 'material-ui/TextField';

export default class Identifier  extends React.Component {
  constructor() {
    super();
   this.state = {
        "Identifier": ""
    };
  }

  handleChange = identifier => event => {
    this.setState({
      "Identifier": event.target.value,
    });
    console.log("identifier updated")
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
