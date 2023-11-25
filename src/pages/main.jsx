import React, { useEffect } from "react";
import { Container } from "@mui/material";
import Listcards from "../components/Listcards";
import Searchbar from "../components/Searchbar";

const Main = () => {
 return (
  <Container>
   <Searchbar />
   <Listcards />
  </Container>
 );
};

export default Main;
