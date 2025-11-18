import { Router } from "express";
import { passportAuthenticationJWT } from "../config/passport.config";
import { addCommentController, getCommentsController } from "../controllers/comment.controller";

const router = Router();

router.post("/:taskId", passportAuthenticationJWT, addCommentController);

router.get("/:taskId", passportAuthenticationJWT, getCommentsController);

export default router;
