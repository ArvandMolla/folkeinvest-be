import express, { Application } from "express";
import cors from "cors";
import eventRouter from "./api/eventsAPI";
import { createServer } from "http";

process.env.TS_NODE_DEV && require("dotenv").config();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use(eventRouter);
// app.get("/test", (req, res) => {
//   res.status(200).send("hello");
// });
const server = createServer(app);

export default server;
