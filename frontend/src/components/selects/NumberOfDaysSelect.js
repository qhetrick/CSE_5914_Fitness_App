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

const numberOfDays = ["1", "2", "3", "4", "5", "6", "7"];

function getStyles(day, numberOfDays, theme) {
  return {
    fontWeight:
      numberOfDays.indexOf(day) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function NumberOfDaysSelect() {
  const theme = useTheme();
  const label = "Number of Days";
  const [days, setDays] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDays(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 400 }}>
        <InputLabel id="select-number-of-days-label" color={theme.contrastText}>
          {label}
        </InputLabel>
        <Select
          labelId="select-number-of-days-label"
          label={label}
          id="select-days-chip"
          single
          value={days}
          onChange={handleChange}
          input={<OutlinedInput id="select-days-chip" label={label} />}
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
          {numberOfDays.map((day) => (
            <MenuItem key={day} value={day} style={getStyles(day, days, theme)}>
              {day}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
