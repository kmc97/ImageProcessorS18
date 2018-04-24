import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

var styles = {
  "appBarStyle": {
    "marginBottom": "50px",
    "marginLeft":"10px",
    "backgroundColor": "green",
  }
}

export default class Title extends React.Component {
  render() {
    return (
      <div>
      <AppBar position="static" style={styles.appBarStyle}>
            <Toolbar>
                <Typography variant="display3" gutterBottom align="right">
                    Image Processing
                </Typography>
            </Toolbar>
        </AppBar>
      </div>
    )
  }
}
