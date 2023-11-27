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
    height: "8vh",
   }}
  >
   <Container
    maxWidth="xl"
    sx={{
     display: "flex",
     justifyContent: "space-between",
    }}
   >
    <Toolbar disableGutters>
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
        color: "inherit",
        textDecoration: "none",
       }}
      >
       Pokemon TCG
      </Typography>
     </Box>
     <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="See cart">
       <IconButton aria-label="cart" onClick={handleCartClick}>
        <StyledBadge badgeContent={totalItems} color="secondary">
         <ShoppingCartIcon />
        </StyledBadge>
       </IconButton>
      </Tooltip>
     </Box>
     <Box>
      <Avatar
       src="https://p7.hiclipart.com/preview/14/79/689/flag-of-france-flag-of-italy-national-flag-france.jpg"
       onClick={() => changeLanguage("fr")}
      />
      <Avatar
       src="https://w7.pngwing.com/pngs/64/514/png-transparent-flag-of-great-britain-flag-of-the-united-kingdom-english-flag-miscellaneous-angle-english.png"
       onClick={() => changeLanguage("en")}
      />
     </Box>
    </Toolbar>
   </Container>
  </AppBar>
 );
};
export default Navbar;
