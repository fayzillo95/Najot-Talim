import {Router} from "express";
import userController from "../controller/users.controller.js"
import {jwtMidllwares} from "../midllwares/responseHandlers/jwtMidllwares.js";
import {responseHandlers} from "../midllwares/responseHandlers/responseHandlers.js";

const userRouter = Router();

userRouter.post("/v1/register", userController.createUser, jwtMidllwares);
userRouter.post("/v2/login", userController.login, jwtMidllwares);
userRouter.get("/v3/:id", userController.getOneUser, responseHandlers);
userRouter.put("/v4/", userController.UpdateUser, responseHandlers);
userRouter.delete("/v5/", userController.deleteUser, responseHandlers);

export default userRouter;
