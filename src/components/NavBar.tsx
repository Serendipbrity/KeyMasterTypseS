import React, { useState } from "react";
import { Box, Tabs } from "@mui/material";
import '../styles/NavBar.css';
import LinkTab from './LinkTab'; // Assuming LinkTab is in the same directory

export default function NavBar() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box className="box-container">
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="navigation tabs example"
        role="navigation"
      >
        <LinkTab label="Home" to="/" />
        <LinkTab label="Build Your Own" to="/build" />
        <LinkTab label="Play Preset" to="/preset" />
      </Tabs>
    </Box>
  );
}
