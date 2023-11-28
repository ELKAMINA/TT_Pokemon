import React, { useEffect, useState } from "react";
import { Container, Box } from "@mui/material";
import Listcards from "../components/Listcards";
import Searchbar from "../components/Searchbar";
import Filters from "../components/Filters";
import Navbar from "../components/common/Navbar";
import Cart from "../components/common/Cart";

const Main = () => {
 return (
  <>
   <Navbar />
   <Container
    sx={{
     display: "flex",
     flexDirection: "column",
     justifyContent: "space-between",
     alignItems: "center",
     height: "90vh",
     minWidth: "100vw",
    }}
   >
    <Box
     sx={{
      display: "flex",
      flexDirection: "column",
      m: 4,
      alignItems: "center",
      //   backgroundColor: "cyan",
      width: "100%",
     }}
    >
     <Box>
      <img
       src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"
       alt="Pokemon Logo"
       style={{
        width: "100%",
        maxWidth: "600px",
        height: "auto",
        margin: "0 auto",
       }}
      />
     </Box>
     <Searchbar />
     <Filters />
    </Box>
    <Listcards />
    <Cart />
   </Container>
  </>
 );
};

export default Main;
