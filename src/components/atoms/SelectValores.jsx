import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectValores({ texto, options, value, onChange }) {
  return (
    <FormControl sx={{ m: 1, minWidth: '70%', backgroundColor: 'white' }}>
      <InputLabel id="demo-select-small-label">{texto}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={value} // Controlado pelo componente pai
        label={texto}
        onChange={onChange} // Atualiza o estado no componente pai
      >
       
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}