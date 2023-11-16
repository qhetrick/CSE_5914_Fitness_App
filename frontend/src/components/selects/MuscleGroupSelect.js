import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";


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

const muscleGroups = [
  "Abductors",
  "Abs",
  "Adductors",
  "Biceps",
  "Calves",
  "Cardio",
  "Chest",
  "Core",
  "Forearms",
  "Glutes",
  "Hamstrings",
  "Lats Back",
  "Lower Back",
  "Middle Back",
  "Neck",
  "Plyometrics",
  "Quadricepts",
  "Shoulders",
  "Stretching",
  "Traps",
  "Triceps",
];

function getStyles(muscle, muscleGroup, theme) {
  return {
    fontWeight:
      muscleGroup.indexOf(muscle) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MuscleGroupSelect(props) {
  const theme = useTheme();
  const label = "Muscle Group";
  const [muscleGroup, setMuscleGroup] = React.useState([]);
  const setSelectedMuscles = props.setSelectedMuscles;

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setMuscleGroup(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    setSelectedMuscles(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 400 }}>
        <InputLabel id="select-muscle-group-label" color={theme.contrastText}>
          {label}
        </InputLabel>
        <Select
          labelId="select-muscle-group-label"
          label={label}
          id="select-muscle-chip"
          multiple
          value={muscleGroup}
          onChange={handleChange}
          input={<OutlinedInput id="select-muscle-chip" label={label} />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  style={{ backgroundColor: "#f2efea" }}
                  key={value}
                  label={value}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {muscleGroups.map((muscle) => (
            <MenuItem
              key={muscle}
              value={muscle}
              style={getStyles(muscle, muscleGroup, theme)}
            >
              {muscle}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
