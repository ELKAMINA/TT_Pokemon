import React from "react";
import { Drawer, Typography, styled } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import {
 selectOpenCart,
 setOpenCart,
 selectCartItems,
} from "../../redux/slices/cartSlice";
import Item from "./Item";
import Divider from "@mui/material/Divider";
import { pricing } from "../../utils/pricing";
import { useTranslation } from "react-i18next";

const StyledDrawer = styled(Drawer)(({ theme }) => ({
 ".MuiDrawer-paper": {
  width: "50vw",
 },
}));

const Cart = () => {
 const { t, i18n } = useTranslation();
 const dispatch = useAppDispatch();
 const openCart = useAppSelector(selectOpenCart);
 const itemsInCart = useAppSelector(selectCartItems);
 const calculateTotalPrice = (it) => {
  return it.reduce((acc, item) => {
   const itemPrice = item.cardmarket?.prices?.averageSellPrice
    ? pricing(item.cardmarket?.prices?.averageSellPrice).toFixed(3)
    : 1;
   //    console.log("itemPrice", itemPrice);
   //    console.log("itemQuantity", item.quantity);
   return acc + itemPrice * item.quantity;
  }, 0);
 };
 const handleCloseCart = () => {
  dispatch(setOpenCart(false));
 };

 //  console.log("itemsInCart", itemsInCart);
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
   <Typography
    variant="h2"
    sx={{
     margin: "20px 0px 50px 20px",
    }}
   >
    {t("cart.title")}
   </Typography>
   {itemsInCart.length > 0 &&
    itemsInCart.map((item, index) => {
     return (
      <>
       <Item key={index + 1} card={item} />
       <Divider />
      </>
     );
    })}
   {itemsInCart.length === 0 && (
    <Typography variant="h3">{t("cart.empty")}</Typography>
   )}
   <Typography
    variant="h1"
    sx={{
     margin: "20px 0px 50px 20px",
     fontSize: "50px",
     fontWeight: 400,
    }}
   >
    Total : {calculateTotalPrice(itemsInCart) + "€"}
   </Typography>
  </StyledDrawer>
 );
};

export default Cart;
