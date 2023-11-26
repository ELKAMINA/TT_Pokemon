import React from "react";
import { Container, Box, Typography } from "@mui/material";
import {
 selectCartItems,
 addItemToCart,
 deleteItemFromCart,
} from "../../redux/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { TextField } from "@mui/material";
import "../../styles/items.styles.css";
import { pricing } from "../../utils/pricing";

function Item({ card }) {
 const allItemsInCart = useAppSelector(selectCartItems);
 const totalUniqueItem = allItemsInCart.find(
  (item) => item.id === card.id
 )?.quantity;

 const cardPrice = card.cardmarket?.prices?.averageSellPrice
  ? pricing(card.cardmarket?.prices?.averageSellPrice).toFixed(2)
  : 1;
 const dispatch = useAppDispatch();

 const handleAddToCartClick = () => {
  dispatch(addItemToCart(card));
 };

 const handleRemoveItem = () => {
  dispatch(deleteItemFromCart(card));
 };

 return (
  <Container
  //   sx={{ backgroundColor: "orange" }}
  >
   <Box
   //    sx={{ backgroundColor: "grey" }}
   >
    <Typography
     variant="h4"
     sx={{
      marginBottom: "10px",
     }}
    >
     {card.name + " - " + card.supertype}
    </Typography>
    <Box
     sx={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingBottom: "10px",
      //   backgroundColor: "yellow",
      width: "70%",
      marginLeft: "10px",
      marginTop: "20px",
     }}
    >
     <Typography variant="p"> Unit price: {cardPrice + "€"}</Typography>
     <Typography variant="p">
      Total price: {(totalUniqueItem * cardPrice).toFixed(2) + "€"}
     </Typography>
    </Box>

    <Box
     sx={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
     }}
    >
     <RemoveCircleIcon sx={{ cursor: "pointer" }} onClick={handleRemoveItem} />
     <TextField
      sx={{
       width: "40%",
       textAlign: "center",
       cursor: "default",
      }}
      id="outlined-basic"
      variant="outlined"
      value={totalUniqueItem}
      disabled
     />
     <AddCircleIcon sx={{ cursor: "pointer" }} onClick={handleAddToCartClick} />
     <img className="item-cart-img" src={card.images?.small} alt={card.name} />
    </Box>
   </Box>
  </Container>
 );
}

export default Item;
