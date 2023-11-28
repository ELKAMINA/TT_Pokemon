import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { useAppDispatch } from "../redux/hooks/hooks";
import { setFilters, resetPage } from "../redux/slices/pokemonSlice";

const toggleButtonStyle = {
 ml: 4,
 fontFamily: "Pokemon",
 fontSize: "15px",
 minWidth: "30px",
 height: "30px",
 border: "none",
 textTransform: "none",
};

const Filters = () => {
 const [toggled, setToggled] = React.useState([""]);
 const { t } = useTranslation();
 const dispatch = useAppDispatch();

 const handleToggles = (event, isToggled) => {
  if (!isToggled.length) {
   setToggled([]);
   dispatch(setFilters([]));
  }
  if (isToggled.length) {
   const array = isToggled.filter((item) => item !== "");
   setToggled(array);
   dispatch(setFilters(array));
   dispatch(resetPage());
  }
 };
 return (
  <Box
   sx={{
    display: "flex",
    alignItems: "center",
   }}
  >
   <Box
    sx={{
     display: "flex",
     flexDirection: "row",
     justifyContent: "center",
     alignItems: "center",
    }}
   >
    <Typography
     sx={{
      fontFamily: "Pokemon",
      fontSize: "18px",
      fontWeight: "bold",
      width: "100%",
      height: "30px",
      border: "none",
      m: 1,
     }}
    >
     {t("filters.choice")}
    </Typography>
   </Box>
   <Box
    sx={{
     width: "150%",
     display: "flex",
     flexDirection: "row",
     justifyContent: "center",
    }}
   >
    <ToggleButtonGroup
     value={toggled}
     aria-label="pokemon filters"
     onChange={handleToggles}
     sx={{
      borderRadius: 2,
      "& .MuiToggleButtonGroup-grouped": {
       border: 0,
       borderRadius: 50,
       margin: "1px",
       "&.Mui-selected": {
        backgroundColor: "primary.secondary",
       },
       "&:not(:first-of-type)": {
        borderRadius: 2,
       },
       "&:first-of-type": {
        borderRadius: 2,
       },
       "&:last-of-type": {
        borderRadius: 2,
       },
      },
     }}
    >
     <ToggleButton
      value="Holo rare"
      aria-label="Rarity"
      fullWidth
      sx={{
       ...toggleButtonStyle,
      }}
     >
      Rare Holo
     </ToggleButton>
     <ToggleButton
      fullWidth
      value="Descending prices"
      aria-label="low-prices"
      sx={{
       ...toggleButtonStyle,
      }}
      disabled={
       toggled.length && toggled.includes("Ascending prices") ? true : false
      }
     >
      {t("filters.descendingPrices")}
     </ToggleButton>
     <ToggleButton
      fullWidth
      value="Ascending prices"
      aria-label="high-prices"
      sx={{
       ...toggleButtonStyle,
      }}
      disabled={
       toggled.length && toggled.includes("Descending prices") ? true : false
      }
     >
      {t("filters.ascendingPrices")}
     </ToggleButton>
    </ToggleButtonGroup>
   </Box>
  </Box>
 );
};

export default Filters;
