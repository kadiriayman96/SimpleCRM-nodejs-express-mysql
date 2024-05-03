import express from "express";
import {
  getCommandes,
  addCommande,
  updateCommande,
  deleteCommande,
  getSingleCommande,
} from "../controllers/commandeController.js";

const commandeRouter = express.Router();

commandeRouter.route("/").get(getCommandes).post(addCommande);
commandeRouter
  .route("/:id")
  .put(updateCommande)
  .delete(deleteCommande)
  .get(getSingleCommande);

export default commandeRouter;
