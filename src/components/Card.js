import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { TextField } from "@mui/material";
import ButtonBase from "@mui/material/ButtonBase";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import {
 addItemToCart,
 selectCartItems,
 deleteItemFromCart,
} from "../redux/slices/cartSlice";
import { pricing } from "../utils/pricing";
import Pokemon from "./Pokemoninfo";

const Img = styled("img")({
 margin: "auto",
 display: "block",
 maxWidth: "100%",
 maxHeight: "100%",
});

const Card = ({ card }) => {
 const dispatch = useAppDispatch();
 const [open, setOpen] = React.useState(false);
 const allItemsInCart = useAppSelector(selectCartItems);
 const totalUniqueItem = allItemsInCart.find(
  (item) => item.id === card.id
 )?.quantity;
 //  console.log("totalItemsInCart", allItemsInCart);
 //  console.log("totalItems", totalUniqueItem);
 //  console.log("card id", card.id);
 const handleAddToCartClick = () => {
  dispatch(addItemToCart(card));
 };

 const handleRemoveItem = () => {
  // console.log("je rentre ici ", card.name);
  dispatch(deleteItemFromCart(card));
 };

 const handlePokClick = () => {
  setOpen(true);
 };

 useEffect(() => {}, [totalUniqueItem]);

 console.log("card", card);
 const content = (
  <Paper
   sx={{
    p: 2,
    margin: "auto",
    maxWidth: 500,
    flexGrow: 1,
    backgroundColor: (theme) =>
     theme.palette.mode === "dark" ? "#1A2027" : "#fff",
   }}
  >
   <Grid container spacing={2}>
    <Grid item>
     <ButtonBase sx={{ width: 128, height: 128 }} onClick={handlePokClick}>
      <Img alt="complex" src={card.images?.large} />
     </ButtonBase>
    </Grid>
    <Grid item xs={12} sm container>
     <Grid item xs container direction="column" spacing={2}>
      <Grid item xs>
       <Typography gutterBottom variant="subtitle1" component="div">
        {card.name}
       </Typography>
       <Typography variant="body2" gutterBottom></Typography>
       <Typography variant="body2" color="text.secondary">
        {card.rarity}
       </Typography>
      </Grid>
      <Grid item>
       {!totalUniqueItem && (
        <ButtonBase onClick={handleAddToCartClick}>
         <Typography sx={{ cursor: "pointer" }} variant="body2">
          Add to cart
         </Typography>
        </ButtonBase>
       )}
       {totalUniqueItem > 0 && (
        <Box>
         <RemoveCircleIcon
          sx={{ cursor: "pointer" }}
          onClick={handleRemoveItem}
         />
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
         <AddCircleIcon
          sx={{ cursor: "pointer" }}
          onClick={handleAddToCartClick}
         />
        </Box>
       )}
      </Grid>
     </Grid>
     <Grid item>
      <Typography
       variant="subtitle1"
       component="div"
       sx={{
        marginLeft: "10px",
       }}
      >
       {card.cardmarket?.prices?.averageSellPrice
        ? pricing(card.cardmarket?.prices?.averageSellPrice).toFixed(2) + " €"
        : 1 + " €"}
      </Typography>
     </Grid>
    </Grid>
   </Grid>
   <Pokemon open={open} setOpen={setOpen} card={card} />
  </Paper>
 );

 return content;
};

export default Card;
