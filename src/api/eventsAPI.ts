import express, { Request, Response, NextFunction } from "express";
import eventModel from "../models/event";

const eventRouter = express.Router();

eventRouter.get(
  "/api/event",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await eventModel.find().sort({ sam: 1 });

      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send("no event was found!");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

eventRouter.get(
  "/api/event/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await eventModel.findById(req.params.id);

      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send("no event was found!");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

eventRouter.post(
  "/api/event",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newEvent = new eventModel(req.body);
      const createdEvent = await newEvent.save();
      res.status(201).send(createdEvent);
    } catch (error) {
      console.log(error);
    }
  }
);

export default eventRouter;
