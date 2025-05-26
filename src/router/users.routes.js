import {Router} from "express";
import userController from "../controller/users.controller.js"
import {jwtMidllwares} from "../midllwares/responseHandlers/jwtMidllwares.js";
import {responseHandlers} from "../midllwares/responseHandlers/responseHandlers.js";
import {registerValidation} from "../midllwares/authentificators/registerValidation.js";

const userRouter = Router();

userRouter.post("/v1/register",registerValidation, userController.createUser, jwtMidllwares);
userRouter.post("/v2/login", userController.login, jwtMidllwares);
userRouter.get("/v3/:id", userController.getOneUser, responseHandlers);
userRouter.put("/v4/", userController.UpdateUser, responseHandlers);
userRouter.get("/v5/all",userController.getAllUsers,responseHandlers)
userRouter.delete("/v6/", userController.deleteUser, responseHandlers);

export default userRouter;
