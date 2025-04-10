import { ObjectId } from "mongoose";

export type TQuery = {
  page: string;
  limit: string;
  priority: string;
  status: string;
  sortBy: string;
  taskStatus: string;
  asc: string;
};

export type TTask = {
  _id: ObjectId;
  name: string;
  description?: string;
  status: "to-do" | "in-progress" | "completed";
  dueDate?: string;
  priority?: "low" | "medium" | "high";
  createdAt?: Date;
  updatedAt?: Date;
};

export type TProject = {
  _id: ObjectId;
  user: ObjectId;
  title: string;
  description?: string;
  status: "active" | "archived";
  tasks?: TTask[];
};
