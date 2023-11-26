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

const StyledDrawer = styled(Drawer)(({ theme }) => ({
 ".MuiDrawer-paper": {
  width: "50vw",
 },
}));

const Cart = () => {
 const dispatch = useAppDispatch();
 const openCart = useAppSelector(selectOpenCart);
 const itemsInCart = useAppSelector(selectCartItems);
 const calculateTotalPrice = (it) => {
  return it.reduce((acc, item) => {
   const itemPrice = item.cardmarket?.prices?.averageSellPrice
    ? pricing(item.cardmarket?.prices?.averageSellPrice).toFixed(3)
    : 1;
   console.log("itemPrice", itemPrice);
   console.log("itemQuantity", item.quantity);
   return acc + itemPrice * item.quantity;
  }, 0);
 };
 const handleCloseCart = () => {
  dispatch(setOpenCart(false));
 };

 console.log("itemsInCart", itemsInCart);
 return (
  <StyledDrawer anchor="right" open={openCart} onClose={handleCloseCart}>
   <Typography
    variant="h2"
    sx={{
     margin: "20px 0px 50px 20px",
    }}
   >
    Your cart
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
    <Typography variant="h3">Your cart is empty</Typography>
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
