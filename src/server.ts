import app from ".";
import http from "http";
import config from "./app/config";
import connectToDB from "./app/db/db";
import swaggerDocs from "./app/config/swagger";

const server = http.createServer(app);

const startServer = async () => {
  await connectToDB();
  server.listen(config.PORT, async () => {
    console.log(`Server is running on port ${config.PORT}`);
    swaggerDocs(app, config.PORT!); // Initialize Swagger documentation
  });
};

startServer();
