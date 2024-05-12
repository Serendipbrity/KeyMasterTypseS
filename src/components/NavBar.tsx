import { useState, useEffect } from "react";
import { Box, Tabs } from "@mui/material";
import { useLocation } from 'react-router-dom';
import '../styles/NavBar.css';
import LinkTab from './LinkTab'; // Assuming LinkTab is in the same directory

export default function NavBar() {
  const location = useLocation();
  const [value, setValue] = useState<string>(location.pathname);

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

   // Effect to update the tab state based on the current location
   useEffect(() => {
    setValue(location.pathname);
  }, [location]);

  return (
    <Box className="box-container">
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="navigation tabs example"
        role="navigation"
      >
        <LinkTab label="Home" to="/KeyMasterTypseS/" />
        <LinkTab label="Build Your Own" to="/KeyMasterTypseS/build" />
        <LinkTab label="Play Preset" to="/KeyMasterTypseS/preset" />
      </Tabs>
    </Box>
  );
}
