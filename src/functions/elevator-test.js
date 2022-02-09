// interface reqInterface {
//   destination: number;
//   direction: number;
// }

let elevator = [4, 7, 6, 5, 1];

const newReqHandler = (req) => {
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

  console.log(elevator);
};

const nextStepHandler = () => {
  if (elevator[0] === elevator[1]) {
    elevator.shift();
    console.log(elevator);
    const destinations = elevator.slice(1);
    // push destinations to all clients
    if (elevator.length === 1) {
      setTimeout(newReqHandler, 10000, { destination: 4, direction: 0 });
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

setInterval(nextStepHandler, 3000);
// newReqHandler({ destination: 7, direction: 1 });
// newReqHandler({ destination: 5, direction: -1 });
// newReqHandler({ destination: 6, direction: -1 });
// newReqHandler({ destination: 1, direction: 0 });
// newReqHandler({ destination: 6, direction: 0 });
