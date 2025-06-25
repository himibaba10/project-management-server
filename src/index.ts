import dotenv from "dotenv";
dotenv.config();

import express from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import initiateMiddlewares from "./app/middlewares";
import initiateRoutes from "./app/routes";
import notFoundHandler from "./app/middlewares/notFoundHandler";
import handleSyncAsyncError from "./app/middlewares/handleSyncAsyncError";
handleSyncAsyncError();

// Creating the app
const app = express();

// Middleware
initiateMiddlewares(app);

// Routes
initiateRoutes(app);

// Unavailable route middleware
app.all("*", notFoundHandler);

// Error handling middleware
app.use(globalErrorHandler);

export default app;
