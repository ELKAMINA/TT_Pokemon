import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import React, { useEffect } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ButtonBase from "@mui/material/ButtonBase";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import {
 addItemToCart,
 selectCartItems,
 deleteItemFromCart,
} from "../redux/slices/cartSlice";
import { pricing } from "../utils/pricing";
import Pokemon from "./Pokemoninfo";
import { useTranslation } from "react-i18next";

const Img = styled("img")({
 margin: "auto",
 display: "block",
 maxWidth: "100%",
 maxHeight: "100%",
});

const ColorButton = styled(Button)(({ theme }) => ({
 color: theme.palette.getContrastText("#406eb7"),
 backgroundColor: "#406eb7",
 "&:hover": {
  backgroundColor: "#edc228",
 },
}));

const Card = ({ card }) => {
 const dispatch = useAppDispatch();
 const { t } = useTranslation();
 const [open, setOpen] = React.useState(false);
 const allItemsInCart = useAppSelector(selectCartItems);
 const totalUniqueItem = allItemsInCart.find(
  (item) => item.id === card.id
 )?.quantity;

 const handleAddToCartClick = () => {
  dispatch(addItemToCart(card));
 };

 const handleRemoveItem = () => {
  dispatch(deleteItemFromCart(card));
 };

 const handlePokClick = () => {
  setOpen(true);
 };

 useEffect(() => {}, [totalUniqueItem]);

 const content = (
  <Paper
   sx={{
    p: 2,
    margin: "auto",
    width: "500px",
    height: "300px",
    flexGrow: 1,
    "&:hover ": {
     backgroundColor: "#f2ebd2",
    },
    borderRadius: "10px",
   }}
   elevation={10}
  >
   <Grid container>
    <Grid item>
     <ButtonBase sx={{ width: 300, height: 250 }} onClick={handlePokClick}>
      <Img alt="complex" src={card.images?.large} />
     </ButtonBase>
    </Grid>
    <Grid item xs={12} sm container>
     <Grid item xs container direction="column">
      <Grid item xs>
       <Typography
        variant="subtitle1"
        component="h1"
        sx={{ fontSize: 25, fontWeight: "bold", color: "#3762ac" }}
       >
        {card.name}
       </Typography>
       <Typography variant="body2" gutterBottom></Typography>
       <Typography variant="body2" color="#cca108" sx={{ fontSize: 20 }}>
        {card.rarity}
       </Typography>
       <Typography
        variant="subtitle1"
        component="div"
        sx={{
         fontWeight: "italic",
         fontSize: 12,
        }}
       >
        {t("card.price")}:{" "}
        {card.cardmarket?.prices?.averageSellPrice
         ? pricing(card.cardmarket?.prices?.averageSellPrice).toFixed(2) + " €"
         : 1 + " €"}
       </Typography>
      </Grid>
      <Grid item>
       {!totalUniqueItem && (
        <ColorButton
         onClick={handleAddToCartClick}
         variant="contained"
         size="medium"
         sx={{ color: "white" }}
         endIcon={<AddShoppingCartIcon />}
        >
         {t("card.addCart")}
        </ColorButton>
       )}
       {totalUniqueItem > 0 && (
        <Box
         sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
         }}
        >
         <RemoveCircleIcon
          sx={{ cursor: "pointer" }}
          onClick={handleRemoveItem}
         />
         <TextField
          sx={{
           width: 70,
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
    </Grid>
   </Grid>
   <Pokemon open={open} setOpen={setOpen} card={card} />
  </Paper>
 );

 return content;
};

export default Card;
