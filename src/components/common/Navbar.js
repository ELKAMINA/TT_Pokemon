import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import { Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import { selectTotalItems, setOpenCart } from "../../redux/slices/cartSlice";
import { useTranslation } from "react-i18next";

const StyledBadge = styled(Badge)(({ theme }) => ({
 "& .MuiBadge-badge": {
  right: -3,
  top: 13,
  border: `2px solid ${theme.palette.background.paper}`,
  padding: "0 4px",
 },
}));

const Navbar = () => {
 const totalItems = useAppSelector(selectTotalItems);
 const { t, i18n } = useTranslation();

 const dispatch = useAppDispatch();
 const handleCartClick = (event) => {
  //   console.log("OK cliqué");
  dispatch(setOpenCart(true));
 };

 React.useEffect(() => {}, [totalItems]);
 const changeLanguage = (language) => {
  i18n.changeLanguage(language);
 };

 return (
  <AppBar
   position="static"
   sx={{
    height: "7vh",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#3466AE",
   }}
  >
   <Container maxWidth="xl">
    <Toolbar
     disableGutters
     sx={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
     }}
    >
     <Box>
      <Typography
       variant="h6"
       noWrap
       component="a"
       sx={{
        mr: 2,
        display: { xs: "none", md: "flex" },
        fontFamily: "monospace",
        fontWeight: 700,
        letterSpacing: ".3rem",
        textDecoration: "none",
        color: "#ffcb09",
       }}
      >
       Pokemon TCG
      </Typography>
     </Box>

     <Box
      sx={{
       flexGrow: 0,
       display: "flex",
       flexDirection: "row",
       alignItems: "center",
      }}
     >
      <Tooltip title="See cart">
       <IconButton aria-label="cart" onClick={handleCartClick}>
        <StyledBadge badgeContent={totalItems} color="secondary">
         <ShoppingCartIcon fontSize="large" color="#19356b" />
        </StyledBadge>
       </IconButton>
      </Tooltip>
      <Box
       sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        m: 4,
       }}
      >
       <IconButton
        sx={{
         width: "30px",
         height: "25px",
        }}
        onClick={() => changeLanguage("fr")}
       >
        <img
         src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/1200px-Flag_of_France.svg.png"
         alt="France flag"
         style={{
          width: "20px",
          height: "15px",
         }}
        />
       </IconButton>
       <IconButton
        sx={{
         width: "30px",
         height: "25px",
        }}
        onClick={() => changeLanguage("en")}
       >
        <img
         src="https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg"
         alt="British flag"
         style={{
          width: "20px",
          height: "15px",
         }}
        />
       </IconButton>
      </Box>
     </Box>
    </Toolbar>
   </Container>
  </AppBar>
 );
};
export default Navbar;
