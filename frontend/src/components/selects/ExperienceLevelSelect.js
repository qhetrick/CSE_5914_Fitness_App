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

const experienceLevels = [
  'Beginner',
  'Intermediate',
  'Advanced'
];

function getStyles(experienceLevel, experienceLevelSelect, theme) {
  return {
    fontWeight:
      experienceLevel === experienceLevelSelect
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function ExperienceLevelSelect(props) {
  const theme = useTheme();
  const label = "Experience Level";
  const [selectedExperienceLevel, setSelectedExperienceLevel] = React.useState('');
  const setSelectedExperienceLevels = props.setSelectedExperienceLevels;

  const handleChange = (event) => {
    setSelectedExperienceLevel(event.target.value);
    setSelectedExperienceLevels(event.target.value)
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 400 }}>
        <InputLabel id="select-experience-level-label" color={theme.contrastText}>{label}</InputLabel>
        <Select
          labelId="select-experience-level-label"
          label={label}
          id="select-experience-level-chip"
          value={selectedExperienceLevel}
          onChange={handleChange}
          input={<OutlinedInput id="select-experience-level-chip" label={label} />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              <Chip
                style={{ backgroundColor: "#f2efea" }}
                key={selected}
                label={selected}
              />
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {experienceLevels.map((experienceLevel) => (
            <MenuItem
              key={experienceLevel}
              value={experienceLevel}
              style={getStyles(experienceLevel, selectedExperienceLevel, theme)}
            >
              {experienceLevel}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}