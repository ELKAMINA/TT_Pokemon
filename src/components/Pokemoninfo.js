import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import { Typography, Divider, Box, Container } from "@mui/material";
import pokemonInfo from "../utils/pokemonInfo";

function PaperComponent(props) {
 return (
  <Draggable
   handle="#draggable-dialog-title"
   cancel={'[class*="MuiDialogContent-root"]'}
  >
   <Paper
    {...props}
    sx={{
     height: "80%",
     minWidth: "80%",
     padding: "16px",
    }}
   />
  </Draggable>
 );
}

export default function Pokemon({ open, setOpen, card }) {
 const pokInfo = pokemonInfo(card);
 const handleClose = () => {
  setOpen(false);
 };

 React.useEffect(() => {
  //   console.log("card retravaillée", pokInfo);
 }, [card.id]);

 return (
  <React.Fragment>
   <Dialog
    open={open}
    onClose={handleClose}
    PaperComponent={PaperComponent}
    aria-labelledby="draggable-dialog-title"
   >
    <DialogTitle
     style={{ cursor: "move" }}
     id="draggable-dialog-title"
     sx={{
      width: "100%",
      height: "20%",
      // backgroundColor: "beige",
      padding: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
     }}
    >
     <img src={pokInfo.svgImage} alt="pokemon" />
     <Typography
      sx={{
       color: "rgb(83, 157, 223)",
       fontSize: "2rem",
       fontFamily: "Montserrat,sans-serif",
      }}
     >
      {pokInfo.hp}
     </Typography>
     <Typography
      sx={{
       color: "rgb(78, 87, 97)",
       fontSize: "4rem",
       fontWeight: "bold",
       fontFamily: "Montserrat,sans-serif",
      }}
     >
      {pokInfo?.title ? pokInfo.title : ""}
     </Typography>
     <Typography
      sx={{
       color: "rgb(78, 87, 97)",
       fontSize: "2rem",
       fontWeight: 300,
       fontFamily: "Montserrat,sans-serif",
      }}
     >
      {pokInfo.subtitle}
     </Typography>
    </DialogTitle>
    <Divider sx={{ mb: 5 }} />
    <DialogContent
     sx={{
      display: "flex",
      flexDirection: "row",
     }}
    >
     <img
      src={pokInfo.image}
      alt={pokInfo.image}
      style={{ maxWidth: "700px" }}
     />
     <DialogContentText>
      <Typography
       variant="h6"
       sx={{
        color: "rgb(78, 87, 97)",
        fontSize: "2rem",
        fontWeight: 400,
        fontFamily: "Montserrat,sans-serif",
        m: 3,
       }}
      >
       {pokInfo.attacks?.title ? pokInfo.attacks.title : "Attacks"}
      </Typography>
      <Box
       variant="h6"
       sx={{
        color: "rgb(21, 27, 34)",
        fontSize: "2rem",
        fontWeight: 300,
        m: 3,
        fontFamily: "Montserrat,sans-serif",
       }}
      >
       {pokInfo.attacks && pokInfo.attacks.attacks
        ? pokInfo.attacks.attacks.map((el) => {
           return (
            <>
             <Typography
              variant="h4"
              sx={{
               color: "rgb(21, 27, 34)",
               fontSize: "2rem",
               mt: 5,
               fontWeight: 300,
               fontFamily: "Montserrat,sans-serif",
              }}
             >
              {el.name} {el.damage}
             </Typography>
             <Divider
              sx={{
               m: 1,
              }}
             />
             <Typography
              variant="p"
              sx={{
               color: "rgb(123, 129, 136)",
               fontSize: "1.5rem",
               fontWeight: 300,
               fontFamily: "Montserrat,sans-serif",
              }}
             >
              {" "}
              {el.text}
             </Typography>
            </>
           );
          })
        : "N/A"}
      </Box>
     </DialogContentText>
     <DialogContent
      sx={{
       display: "flex",
       flexWrap: "wrap",
       flexDirection: "column",
       //  backgroundColor: "yellow",
       justifyContent: "space-around",
       alignItems: "center",
       width: "100%",
       textAlign: "left",
      }}
     >
      <DialogContentText>
       <Typography
        variant="h4"
        sx={{
         color: "rgb(123, 129, 136)",
         fontSize: "1.5rem",
         fontWeight: 300,
         fontFamily: "Montserrat,sans-serif",
        }}
       >
        <span>Weaknesses</span> :{" "}
        {pokInfo.weaknesses?.map((el) => el.type + " " + el.value)}
       </Typography>
      </DialogContentText>
      <DialogContentText>
       <Typography
        variant="h4"
        sx={{
         color: "rgb(123, 129, 136)",
         fontSize: "1.5rem",
         fontWeight: 300,
         fontFamily: "Montserrat,sans-serif",
        }}
       >
        {" "}
        Rarity: {pokInfo.rarity}
       </Typography>
      </DialogContentText>
      <DialogContentText>
       <Typography
        variant="h4"
        sx={{
         color: "rgb(123, 129, 136)",
         fontSize: "1.5rem",
         fontWeight: 300,
         fontFamily: "Montserrat,sans-serif",
        }}
       >
        {" "}
        Artist: {pokInfo.artist}
       </Typography>
      </DialogContentText>
     </DialogContent>
    </DialogContent>
    <DialogActions>
     <Button autoFocus onClick={handleClose}>
      OK
     </Button>
    </DialogActions>
   </Dialog>
  </React.Fragment>
 );
}
