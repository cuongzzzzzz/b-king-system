const app = require("./src/app");
const server = require("./src/socket/socket");
const PORT = 3000;

server.listen(PORT, () => {
  console.log("server was started at PORT : ", PORT);
});
