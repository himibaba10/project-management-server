import { Schema, model } from "mongoose";
import { TProject, TTask } from "../interfaces/project.interface";

const taskSchema = new Schema<TTask>(
  {
    name: { type: String, required: true },
    description: String,
    status: {
      type: String,
      enum: ["to-do", "in-progress", "completed"],
      default: "to-do",
    },
    dueDate: Date,
    priority: { type: String, enum: ["low", "medium", "high"] },
  },
  { timestamps: true }
);

const projectSchema = new Schema<TProject>(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: String,
    status: { type: String, enum: ["active", "archived"], default: "active" },
    tasks: [taskSchema],
    collaborators: { type: [Schema.Types.ObjectId], ref: "User", default: [] },
  },
  { timestamps: true }
);

const Project = model<TProject>("Project", projectSchema);
export default Project;
