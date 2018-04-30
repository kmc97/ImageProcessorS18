import React from 'react';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import { ListItemText } from 'material-ui/List';
import Select from 'material-ui/Select';
import Checkbox from 'material-ui/Checkbox';

const names = [
  'contrast stretching',
  'log compression',
  'reverse video',
  'adaptive equalization'
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
  constructor() {
    super();
    this.state = {
      "methods":[]
    };
  }

  handleChange = event => {
    this.setState({methods: event.target.value });
    this.props.onMethodsChange(event);
    console.log("methods state changed")
  };

  render () {
    return (
      <div style ={{
        textAlign: "center",
        marginLeft: "100px",
        marginBottom: "10px",
      }}>
        <FormControl>
            <InputLabel htmlFor="select-multiple-checkbox">
                Only one method allowed
            </InputLabel>
          <Select
            multiple
            value={this.state.methods}
            onChange={this.handleChange}
	    input={<Input id="select-multiple-checkbox" />}
            MenuProps={MenuProps}
            renderValue={selected => selected.join(', ')}
          >
            {names.map(name => (
              <MenuItem key={name} value={name}> 
                <Checkbox checked={this.state.methods.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    )}
  }
