import React from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useTranslation } from "react-i18next";
import { Drawer, Typography, styled, Box } from "@mui/material";

import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import {
 selectOpenCart,
 setOpenCart,
 selectCartItems,
 resetCart,
} from "../../redux/slices/cartSlice";
import Item from "./Item";
import { calculateTotalPrice } from "../../utils/pricing";

const StyledDrawer = styled(Drawer)(({ theme }) => ({
 ".MuiDrawer-paper": {
  width: "50vw",
 },
}));

const Cart = () => {
 const { t } = useTranslation();
 const dispatch = useAppDispatch();
 const openCart = useAppSelector(selectOpenCart);
 const itemsInCart = useAppSelector(selectCartItems);

 const handleCloseCart = () => {
  dispatch(setOpenCart(false));
 };

 const clearCart = () => {
  dispatch(resetCart());
 };

 return (
  <StyledDrawer
   anchor="right"
   open={openCart}
   onClose={handleCloseCart}
   sx={{
    background:
     "linear-gradient(180deg, #edc228 0%, rgba(52, 102, 174, 0.49) 97%)",
   }}
  >
   <Box
    sx={{
     display: "flex",
     flexDirection: "row",
     justifyContent: "space-between",
    }}
   >
    <Typography
     variant="h2"
     sx={{
      margin: "20px 0px 50px 20px",
      color: "#19356b",
     }}
    >
     {t("cart.title")}
    </Typography>
    {itemsInCart.length > 0 && (
     <Button sx={{ m: 2, color: "#3880f4" }} onClick={clearCart}>
      {t("cart.delete")}
     </Button>
    )}
   </Box>
   {itemsInCart.length > 0 ? (
    itemsInCart.map((item, index) => {
     return (
      <React.Fragment key={index.id}>
       <Item card={item} />
       <Divider sx={{ mb: 3 }} />
      </React.Fragment>
     );
    })
   ) : (
    <Typography
     variant="h6"
     sx={{ color: "#19356b", margin: "20px 0px 50px 20px" }}
    >
     {t("cart.empty")}
    </Typography>
   )}
   <Typography
    variant="h1"
    sx={{
     margin: "20px 0px 50px 20px",
     fontSize: "50px",
     fontWeight: 400,
     color: "#19356b",
    }}
   >
    Total : {calculateTotalPrice(itemsInCart).toFixed(2) + "€"}
   </Typography>
  </StyledDrawer>
 );
};

export default Cart;
