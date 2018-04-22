import React from 'react';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import { ListItemText } from 'material-ui/List';
import Select from 'material-ui/Select';
import Checkbox from 'material-ui/Checkbox';

const names = [
  'Histogram Equalization',
  'Contrast Stretching',
  'Log Compression',
  'Reverse Video'
];

export default class Methods extends React.Component {
  state = {
    name: [],
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  render () {
    return (
      <div>
        <FormControl>
          <InputLabel htmlFor="select-multiple-checkbox">Choose One or More Methods</InputLabel>
          <Select
            multiple
            value={this.state.name}
            onChange={this.handleChange}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={selected => selected.join(', ')}
          >
            {names.map(name => (
              <MenuItem key={name} value={name}> 
                <Checkbox checked={this.state.name.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    )}
  }
