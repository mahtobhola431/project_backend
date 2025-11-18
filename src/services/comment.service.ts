import CommentModel from "../models/comment.model";
import TaskModel from "../models/task.model";
import { NotFoundException } from "../utils/appError";

export const createCommentService = async (taskId: string, userId: string, message: string) => {
  const task = await TaskModel.findById(taskId);
  if (!task) {
    throw new NotFoundException("Task not found");
  }

  const comment = await CommentModel.create({
    task: taskId,
    user: userId,
    message,
  });

  return comment;
};

export const getCommentsByTaskService = async (taskId: string) => {
  return CommentModel.find({ task: taskId })
    .populate("user", "name email profilePicture")
    .sort({ createdAt: 1 });
};
