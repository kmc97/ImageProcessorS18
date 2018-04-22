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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps:{
    style:{
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default class Methods extends React.Component {
  state = {
    name: [],
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  render () {
    return (
      <div style ={{
        marginLeft: "100px",
        marginTop: "50px",
        marginBottom: "10px",
      }}>
        <FormControl>
            <InputLabel htmlFor="select-multiple-checkbox">
                Choose One or More Methods
            </InputLabel>
          <Select
            multiple
            value={this.state.name}
            onChange={this.handleChange}
            input={<Input id="select-multiple-checkbox" />}
            MenuProps={MenuProps}
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
