import "dotenv/config"
import { dbCon } from "./config/db.js";
import express from "express";
import routes from "./router/routes.js";

const server = express()

server.use(express.json())

await dbCon()
routes.forEach(({url,funk}) => server.use(url,funk) )
server.listen(process.env.PORT, () => console.log(`http://${process.env.HOST}:${process.env.PORT}`))