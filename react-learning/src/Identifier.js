import React from 'react';
import TextField from 'material-ui/TextField';

export default class Identifier  extends React.Component {
  constructor() {
    super();
   this.state = {
        "Identifier": "",
        "errorIdentifier":""
    };
  }

  onHandleChange = (event) => {
    console.log("I am here")
    this.setState({"Identifier": event.target.value});
    console.log("state of identifier changed in identifier.js")
    this.props.onIdentifierChange(event);
    var letterNumber = "[0-9a-zA-Z]+$";
    if (this.state.Identifier.match(letterNumber)) {
        console.log("identifier verified")
    } else { this.setState({"errorIdentifier":"Invalid entry, only letters and numbers are allowed"})
    console.log("invalid identifier")
    }
  };

  render() {

    return (
      <div style={{
        textAlign: "center",
        marginLeft: "100px",
        marginTop: "10px"
      }}>
        <div> 
            Please Enter a Unique Identifier 
        </div>
        <TextField>
            id="required"
            label="Required"
            value={this.state.identifier}
            onChange={this.onHandleChange}
            margin="normal"
        </TextField>
        <div> {this.state.errorIdentifier} </div>
        {this.state.identifier}
      </div>
    )
  }
}
