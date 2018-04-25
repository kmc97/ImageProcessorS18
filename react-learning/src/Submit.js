import React from 'react';
import Button from 'material-ui/Button';

export default class Submit extends React.Component {
  constructor() {
    super();
    this.state = {
      "processedData":""};
  }
  
  render() {
   return (
     <Button variant="raised">
        <div style = {{
          textAlign: "center",
          marginLeft: "100px",
          marginTop: "10px"
        }}>
            Submit Image
        </div>
     </Button>
   )
 }
}

