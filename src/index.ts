import server from "./app";

const port: number = 5000;

server.listen(port, () => {
  console.log("✅✅✅ Running on port", port);
});
