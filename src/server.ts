import app from ".";
import http from "http";
import config from "./app/config";
import connectToDB from "./app/db/db";
import swaggerDocs from "./app/config/swagger";

const server = http.createServer(app);

const startServer = async () => {
  try {
    await connectToDB();
    server.listen(config.PORT, async () => {
      console.log(`Server is running on port ${config.PORT}`);

      // Initialize Swagger documentation
      swaggerDocs(app, config.PORT!);
    });
  } catch (error) {
    console.log("Failed to start server");
    console.error(error);
    process.exit(1);
  }
};

startServer();
