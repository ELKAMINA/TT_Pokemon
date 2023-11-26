import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";

const Img = styled("img")({
 margin: "auto",
 display: "block",
 maxWidth: "100%",
 maxHeight: "100%",
});

const Card = ({ card }) => {
 //  console.log("card", card.name);
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
     <ButtonBase sx={{ width: 128, height: 128 }}>
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
       <Typography sx={{ cursor: "pointer" }} variant="body2">
        Add to cart
       </Typography>
      </Grid>
     </Grid>
     <Grid item>
      <Typography variant="subtitle1" component="div">
       $19.00
      </Typography>
     </Grid>
    </Grid>
   </Grid>
  </Paper>
 );

 return content;
};

export default Card;
