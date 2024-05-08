import express from "express";
import {
  getCommandes,
  addCommande,
  updateCommande,
  deleteCommande,
  getSingleCommande,
  getCommandesparFournisseur,
} from "../controllers/commandeController.js";

const commandeRouter = express.Router();

commandeRouter.route("/").get(getCommandes).post(addCommande);
commandeRouter
  .route("/:id")
  .put(updateCommande)
  .delete(deleteCommande)
  .get(getSingleCommande);
commandeRouter.get("/getbyfour/:id", getCommandesparFournisseur);

export default commandeRouter;
