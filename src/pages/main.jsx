import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import Listcards from "../components/Listcards";
import Searchbar from "../components/Searchbar";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import {
 selectSearchquery,
 setSearchquery,
} from "../redux/slices/pokemonSlice";

const Main = () => {
 return (
  <Container>
   <Searchbar />
   <Listcards />
  </Container>
 );
};

export default Main;
