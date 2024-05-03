import express from "express";
import {
  getFactures,
  addFacture,
  updateFacture,
  deleteFacture,
  getSingleFacture,
} from "../controllers/facturesController.js";

const factureRouter = express.Router();

factureRouter.route("/").get(getFactures).post(addFacture);
factureRouter
  .route("/:id")
  .put(updateFacture)
  .delete(deleteFacture)
  .get(getSingleFacture);

export default factureRouter;
