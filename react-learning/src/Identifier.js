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
    this.props.onIdentifierChange(event);
    var letterNumber = "[0-9a-zA-Z]+$";
    if (this.state.Identifier.match(letterNumber) & this.state.Identifier.length() > 0) {
        console.log("identifier entered")
    }
    else { alert("Please enter another identifier only including alphanumeric characters")
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
            onChange={this.handleChange}
            margin="normal"
        </TextField>
      </div>
    )
  }
}
