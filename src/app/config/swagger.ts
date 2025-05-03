import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { Express } from "express";

const swaggerDocument = YAML.load("swagger.yml");

function swaggerDocs(app: Express, _port: string) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

export default swaggerDocs;
