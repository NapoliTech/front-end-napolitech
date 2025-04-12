import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function ButtonMaterialUi({ texto, bg }) {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: bg,

        maxWidth: "300px",
      }}
    >
      {texto}
    </Button>
  );
}
