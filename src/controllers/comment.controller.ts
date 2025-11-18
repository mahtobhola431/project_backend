import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { CommentModel } from "../models/comment.model";
import TaskModel from "../models/task.model";
import { HTTPSTATUS } from "../config/http.config";

export const addCommentController = asyncHandler(async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const { message, attachments = [] } = req.body;
  const userId = req.user?._id;

  const task = await TaskModel.findById(taskId);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const comment = await CommentModel.create({
    taskId,
    userId,
    message,
    attachments,
  });

  return res.status(HTTPSTATUS.CREATED).json({
    message: "Comment added successfully",
    comment,
  });
});

export const getCommentsController = asyncHandler(async (req: Request, res: Response) => {
  const { taskId } = req.params;

  const comments = await CommentModel.find({ taskId })
    .populate("userId", "name email profilePicture")
    .sort({ createdAt: 1 });

  return res.status(HTTPSTATUS.OK).json({
    comments,
  });
});
