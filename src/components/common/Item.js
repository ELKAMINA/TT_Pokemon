import React from "react";
import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Container, Box, Typography } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

import {
 selectCartItems,
 addItemToCart,
 deleteItemFromCart,
} from "../../redux/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import "../../styles/items.styles.css";
import { pricing } from "../../utils/pricing";


function Item({ card }) {
 const { t } = useTranslation();
 const allItemsInCart = useAppSelector(selectCartItems);
 const totalUniqueItem = allItemsInCart.find(
  (item) => item.id === card.id
 )?.quantity; // total per unit item (depending on the quantity)

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
  <Container sx={{ elevation: 10 }}>
   <Box>
    <Typography
     variant="h4"
     sx={{
      marginBottom: "10px",
      color: "#cea616",
      fontWeight: "bold",
     }}
    >
     {card.name + " - " + card.supertype}
    </Typography>
    <Box
     sx={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "70%",
      marginLeft: "10px",
      marginTop: "20px",
     }}
    >
     <Typography variant="h6" sx={{ color: "#3974d3" }}>
      {" "}
      {t("cart.unitPrice")}: {cardPrice + "€"}
     </Typography>
     <Typography variant="h6" sx={{ color: "#3974d3" }}>
      {t("cart.totalPrice")}: {(totalUniqueItem * cardPrice).toFixed(2) + "€"}
     </Typography>
    </Box>

    <Box
     sx={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      minHeight: "300px",
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
     <Box
      sx={{
       minHeight: "300px",
       minWidth: "250px",
      }}
     >
      <img
       src={card.images?.large}
       alt={card.name}
       style={{ minWidth: "100%", height: "100%" }}
      />
     </Box>
    </Box>
   </Box>
  </Container>
 );
}

export default Item;
