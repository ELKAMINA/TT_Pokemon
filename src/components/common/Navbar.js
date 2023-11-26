import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import { selectTotalItems, setOpenCart } from "../../redux/slices/cartSlice";

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
 const dispatch = useAppDispatch();
 const handleCartClick = (event) => {
  console.log("OK cliqué");
  dispatch(setOpenCart(true));
 };

 React.useEffect(() => {}, [totalItems]);

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
    </Toolbar>
   </Container>
  </AppBar>
 );
};
export default Navbar;
