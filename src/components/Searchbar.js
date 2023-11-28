import Box from "@mui/material/Box";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import {
 resetPage,
 selectSearchquery,
 setSearchquery,
} from "../redux/slices/pokemonSlice";
import { compareArrays } from "../utils/arrays";

const Searchbar = () => {
 const { t } = useTranslation();
 const [input, setInput] = useState("");
 const dispatch = useAppDispatch();
 const query = useAppSelector(selectSearchquery);

 const handleSearchInput = (event) => {
  /* if nothing has been typed, display all the cards */
  setInput(event.target.value);
 };

 const handleSearchSubmit = () => {
  const newInput = input.split(" ");
  dispatch(setSearchquery(newInput));
  if (!compareArrays(newInput, query)) {
   dispatch(resetPage());
  }
 };

 return (
  <Box
   sx={{
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    mb: 2,
   }}
  >
   <TextField
    id="outlined-basic"
    label={t("searchbar.label")}
    variant="outlined"
    onChange={handleSearchInput}
    value={input}
    sx={{ width: "50%", m: 1 }}
   />
   <SearchIcon
    onClick={handleSearchSubmit}
    fontSize="large"
    color="#19356b"
    sx={{ cursor: "pointer" }}
   />
  </Box>
 );
};

export default Searchbar;
