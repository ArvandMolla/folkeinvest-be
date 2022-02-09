import express, { Request, Response, NextFunction } from "express";
import destinationModel from "../models/destination";
import { newReqHandler } from "../functions/elevator";

let elevator = [4];
const destinationRouter = express.Router();

destinationRouter.get(
  "/api/all-destinations",
  (req: Request, res: Response) => {
    res.status(200).send(elevator);
  }
);

destinationRouter.post("/api/new-req", (req: Request, res: Response) => {
  let newElevator = newReqHandler(req.body, elevator);
  elevator = newElevator;
  res.status(201).send(elevator);
});

destinationRouter.get("/api/run", () => {
  const nextStepHandler = () => {
    if (elevator[0] === elevator[1]) {
      elevator.shift();
      console.log(elevator);

      if (elevator.length === 1 && elevator[0] !== 4) {
        setTimeout(
          newReqHandler,
          10000,
          { destination: 4, direction: 0 },
          elevator
        );
      }
    }
    if (elevator[0] < elevator[1]) {
      elevator[0] = elevator[0] + 1;
      console.log(elevator);
    }
    if (elevator[0] > elevator[1]) {
      elevator[0] = elevator[0] - 1;
      console.log(elevator);
    }
  };
  setInterval(nextStepHandler, 3000, elevator);
});
export default destinationRouter;
