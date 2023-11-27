import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import { Typography, Divider } from "@mui/material";
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
      backgroundColor: "beige",
      padding: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
     }}
    >
     <img src={pokInfo.svgImage} alt="pokemon" />
     <Typography>{pokInfo.hp}</Typography>
     <Typography>{pokInfo?.title ? pokInfo.title : ""}</Typography>
     <Typography>{pokInfo.subtitle}</Typography>
    </DialogTitle>
    <Divider />
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
      <Typography variant="h6">
       {pokInfo.attacks?.title ? pokInfo.attacks.title : ""}
      </Typography>
      <Typography variant="h6">
       {pokInfo.attacks && pokInfo.attacks.attacks
        ? pokInfo.attacks.attacks.map(
           (el) => el.name + " \n" + el.damage + " \n" + el.text
          )
        : "N/A"}
      </Typography>
     </DialogContentText>
     <DialogContentText>
      <Typography variant="h6">
       {pokInfo.weaknesses?.map((el) => el.type + " " + el.value)}
      </Typography>
     </DialogContentText>
     <DialogContentText>
      <Typography variant="h6">{pokInfo.rarity}</Typography>
     </DialogContentText>
     <DialogContentText>
      <Typography variant="h6">{pokInfo.artist}</Typography>
     </DialogContentText>
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
