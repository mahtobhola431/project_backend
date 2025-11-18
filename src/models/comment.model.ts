import mongoose, { Document, Schema } from "mongoose";

export interface CommentDocument extends Document {
  taskId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  message: string;
  attachments: string[];
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<CommentDocument>(
  {
    taskId: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    attachments: [
      {
        type: String,
        default: [],
      },
    ],
  },
  { timestamps: true }
);

export const CommentModel = mongoose.model<CommentDocument>(
  "Comment",
  CommentSchema
);
