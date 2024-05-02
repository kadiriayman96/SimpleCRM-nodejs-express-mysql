import express from "express";
import { PrismaClient } from "@prisma/client";
import clientRouter from "./routers/clientRouter.js";

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

app.use(express.json());
app.use("/api/clients", clientRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .send("Un problème est survenu! Veuillez contacter l'administrateur.");
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});

const shutdown = async () => {
  console.log("Server is shutting down...");
  await prisma.$disconnect();
  server.close();
};

process.on("SIGINT", async () => {
  await shutdown();
  process.exit(0);
});
