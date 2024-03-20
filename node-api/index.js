import express from "express";
import { PrismaClient } from "@prisma/client";
import morgan from "morgan";
import cors from "cors";
import { globalErrorHandler, urlNotFoundHandler } from './globalErrorHandler.js';
import { getAllItems, getOneItem, createItem, updateOneItem, deleteItem } from "./api.js";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const prisma = new PrismaClient();

app.get("/item",getAllItems);
app.get("/item/:id", getOneItem);
app.post("/item", createItem);
app.put("/item/:id", updateOneItem);
app.delete("/item/:id", deleteItem);

app.use(urlNotFoundHandler);
app.use(globalErrorHandler);

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000 🎉 🚀");
});



// Prisma Commands
// npx prisma init : to create prisma folder and initialize prisma
// npx prisma studio: to open prisma studio and visualize the database
// npx prisma db push: to push the schema to the database or any changes to the schema
