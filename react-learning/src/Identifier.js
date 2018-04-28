import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

export default class Identifier extends React.Component {
  constructor() {
    super();
   this.state = {
        "Identifier": "",
        "errorIdentifier":""
    };
  }
  
  onIdentifierChange = (event) => {
        this.setState({"Identifier":event.target.value}, () => {
            console.log(this.state.Identifier)});
        this.props.onIdentifierChange(event);
  }

    /*
    var letterNumber = "[0-9a-zA-Z]+$";
    if (this.state.Identifier.match(letterNumber)) {
        console.log("identifier verified")
    } else { this.setState({"errorIdentifier":"Invalid entry, only letters and numbers are allowed"})
    console.log("invalid identifier")
    }
  };
*/
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
        <TextField
            value={this.state.Identifier}
            onChange={this.onIdentifierChange}>
        </TextField>
        <Button onClick={this.onButtonClick}>
            Log Text Field Data
        </Button>
        <div> {this.state.errorIdentifier} </div>
      </div>
    )
  }
}
