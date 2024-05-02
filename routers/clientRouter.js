import express from "express";
import {
  getClients,
  addClient,
  updateClient, 
  deleteClient,
  getSingleClient,
} from "../Controllers/clientController.js";

const clientRouter = express.Router();

clientRouter.route("/").get(getClients).post(addClient);
clientRouter
  .route("/:id")
  .get(getSingleClient)
  .put(updateClient)
  .delete(deleteClient);

export default clientRouter;
