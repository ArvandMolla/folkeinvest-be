interface reqInterface {
  destination: number;
  direction: number;
}

export const newReqHandler = (req: reqInterface, elevator: number[]) => {
  if (!elevator.some((elem) => elem === req.destination)) {
    for (let [index, elem] of elevator.entries()) {
      if (index + 1 !== elevator.length) {
        if (req.destination > elem && req.destination < elevator[index + 1]) {
          if (req.direction === 1 || req.direction === 0) {
            elevator.splice(index + 1, 0, req.destination);
            break;
          }
        }

        if (req.destination < elem && req.destination > elevator[index + 1]) {
          if (req.direction === -1 || req.direction === 0) {
            elevator.splice(index + 1, 0, req.destination);
            break;
          }
        }
      } else {
        elevator.push(req.destination);
        break;
      }
    }
  }

  return elevator;
};
