import express, { Application } from "express";
import cors from "cors";
import destinationRouter from "./api/destinationAPI";
import { createServer } from "http";

process.env.TS_NODE_DEV && require("dotenv").config();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use(destinationRouter);

const server = createServer(app);

export default server;
