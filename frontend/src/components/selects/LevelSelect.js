import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const levels = [
  'Beginner',
  'Intermediate',
  'Advanced'
];

function getStyles(level, levelSelect, theme) {
  return {
    fontWeight:
      levelSelect.indexOf(level) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function LevelSelect() {
  const theme = useTheme();
  const label = "Difficulty";
  const [selectedLevel, setSelectedLevel] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedLevel(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 400 }}>
        <InputLabel id="select-level-label" color={theme.contrastText}>{label}</InputLabel>
        <Select
          labelId="select-level-label"
          label={label}
          id="select-level-chip"
          multiple
          value={selectedLevel}
          onChange={handleChange}
          input={<OutlinedInput id="select-level-chip" label={label} />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip style={{backgroundColor:"#f2efea"}} key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {levels.map((level) => (
            <MenuItem
              key={level}
              value={level}
              style={getStyles(level, selectedLevel, theme)}
            >
              {level}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}