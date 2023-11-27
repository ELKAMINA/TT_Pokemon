import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import debounce from "lodash.debounce";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { useAppDispatch } from "../redux/hooks/hooks";
import { setSearchquery } from "../redux/slices/pokemonSlice";
import { useTranslation } from "react-i18next";

const Searchbar = () => {
 const { t, i18n } = useTranslation();
 const [input, setInput] = useState("");
 const dispatch = useAppDispatch();


 const handleSearchInput = (event) => {
  /* if nothing has been typed, display all the cards */
  setInput(event.target.value);
 };

 const handleSearchSubmit = () => {
  dispatch(setSearchquery(input));
 };

 return (
  <Box>
   <TextField
    id="outlined-basic"
    label={t("searchbar.label")}
    variant="outlined"
    onChange={handleSearchInput}
    value={input}
   />
   <SearchIcon onClick={handleSearchSubmit} />
  </Box>
 );
};

export default Searchbar;
