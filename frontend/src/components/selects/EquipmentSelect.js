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

const equipments = [
    'Ab wheel',
    'Balance Ball',
    'Barbell',
    'Barbell, Bench',
    'Barbell, Box',
    'Barbell, Landmine',
    'Barbell, Resistance Band',
    'Battle Rope',
    'Bench',
    'Bench, Cable',
    'Bench, Dumbbells',
    'Bench, Medicine Ball',
    'Bench, Other',
    'Bench, Resistance Band',
    'Bench, Weight Plate',
    'Bosu',
    'Bosu, Cable',
    'Box',
    'Cable',
    'Dumbbells',
    'Elastic Bands, Stability Ball',
    'Equalizer',
    'Foam Roller',
    'Hex Bar \\/ Trap Bar',
    'Kettlebell',
    'Kettlebell, Resistance Band',
    'Landmine',
    'Machine',
    'Machine, Weight Plate',
    'Medicine Ball',
    'Pull-up Bar',
    'Resistance Band',
    'Smith Machine',
    'Stability Ball',
    'TRX',
    'Wall',
    'Weight Plate',
    'None',
    'Other'
  ];

function getStyles(chosenEquipment, possibleEquipment, theme) {
  return {
    fontWeight:
      possibleEquipment.indexOf(chosenEquipment) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function EquipmentSelect(props) {
  const theme = useTheme();
  const label = "Equipment";
  const [equipment, setEquipment] = React.useState([]);
  const setSelectedEquipment = props.setSelectedEquipment

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setEquipment(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    setSelectedEquipment(event.target.value)
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 400 }}>
        <InputLabel id="select-equipment-label" color={theme.contrastText}>
          {label}
        </InputLabel>
        <Select
          labelId="select-equipment-label"
          label={label}
          id="select-equipment-chip"
          multiple
          value={equipment}
          onChange={handleChange}
          input={<OutlinedInput id="select-equipment-chip" label={label} />}
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
          {equipments.map((possibleEquipment) => (
            <MenuItem
              key={possibleEquipment}
              value={possibleEquipment}
              style={getStyles(possibleEquipment, equipment, theme)}
            >
              {possibleEquipment}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
