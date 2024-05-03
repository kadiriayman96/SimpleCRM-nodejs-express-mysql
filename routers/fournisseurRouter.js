import express from "express";
import {
  getFournisseur,
  addFournisseur,
  updateFournisseur,
  deleteFournisseur,
  getSingleFournisseur,
} from "../controllers/fournisseurController.js";

const fournisseurRouter = express.Router();

fournisseurRouter.route("/").get(getFournisseur).post(addFournisseur);
fournisseurRouter
  .route("/:id")
  .put(updateFournisseur)
  .delete(deleteFournisseur)
  .get(getSingleFournisseur);

export default fournisseurRouter;
