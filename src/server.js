import "dotenv/config";
import { dbCon } from "./config/db.js";
import express from "express";
import routes from "./router/routes.js";
import { errorMidllwares } from "./midllwares/responseHandlers/error.midllwares.js";
import fileUpload from "express-fileupload";

const server = express();

server.use(express.json());
server.use(fileUpload({
  createParentPath: true,
  limits: { fileSize: 5 * 1024 * 1024 },
}));
server.use(express.urlencoded({ extended: true }));

await dbCon();

routes.forEach(({ url, funk }) => server.use(url, funk));

server.use(errorMidllwares);

server.listen(process.env.PORT, () =>
  console.log(`Server running at http://${process.env.HOST}:${process.env.PORT}`)
);
