import express from "express";
import userController from "../controller/users.controller.js"
import jwtMidllwares from "../midllwares/responseHandlers/jwtMidllwares.js";
import responseHandlers from "../midllwares/responseHandlers/responseHandlers.js";

const router = express.Router();

router.post("/v1/register", userController.createUser, jwtMidllwares);
router.post("/v2/login", userController.login, jwtMidllwares);
router.get("/v3/:id", userController.getOneUser, responseHandlers);
router.put("/v4/", userController.UpdateUser, responseHandlers);
router.delete("/v5/", userController.deleteUser, responseHandlers);

export default router;
