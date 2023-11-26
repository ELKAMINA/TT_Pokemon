import { Stack } from "@mui/material";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import { useAppDispatch } from "../redux/hooks/hooks";
import { setFilters } from "../redux/slices/pokemonSlice";

const Filters = () => {
 const [toggled, setToggled] = React.useState([""]);
 const dispatch = useAppDispatch();

 const handleToggles = (event, isToggled) => {
  if (isToggled.length) {
   setToggled(isToggled);
   dispatch(setFilters(isToggled));
  }
 };
 return (
  <Stack>
   <ToggleButtonGroup
    value={toggled}
    aria-label="pokemon filters"
    onChange={handleToggles}
   >
    {/* <ToggleButton
     value="All"
     aria-label="all"
     sx={{
      margin: "2%",
      borderRadius: "15px",
     }}
    >
     All
    </ToggleButton> */}
    <ToggleButton
     value="Holo rare"
     aria-label="Rarity"
     sx={{
      margin: "2%",
      borderRadius: "15px",
     }}
    >
     Holo rare
    </ToggleButton>
    <ToggleButton
     value="Descending prices"
     aria-label="low-prices"
     sx={{
      margin: "2%",
      borderRadius: "15px",
     }}
    >
     Descending prices
    </ToggleButton>
    <ToggleButton
     value="Ascending prices"
     aria-label="high-prices"
     sx={{
      margin: "2%",
      borderRadius: "15px",
     }}
    >
     Ascending prices
    </ToggleButton>
   </ToggleButtonGroup>
  </Stack>
 );
};

export default Filters;
