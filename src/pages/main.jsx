import React, { useEffect, useState } from "react";
import { Container, Box } from "@mui/material";
import Listcards from "../components/Listcards";
import Searchbar from "../components/Searchbar";
import Filters from "../components/Filters";
import Navbar from "../components/common/Navbar";

const Main = () => {
 return (
  <>
   <Navbar />
   <Container>
    <Searchbar />
    <Filters />
    <Listcards />
   </Container>
  </>
 );
};

export default Main;
