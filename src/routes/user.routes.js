import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshAccessToken,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

// Secured routes

router.route("/logout").post(verifyJWT, logoutUser); // here we have added our own middleware known as verifyJWT, this function has at last line next() statement of function definition to pass control to the other function and logoutUser can run and like that you can add many middlewares before executing logoutUser function.

router.route("/refresh-token").post(refreshAccessToken);

export default router;
