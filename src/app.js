const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const pinoHttp = require("pino-http");

// Utils
const logger = require("./utils/logger");

// Middlewares
const correlationId = require("./middlewares/correlationId.middleware");
const notFound = require("./middlewares/notFound.middleware");
const errorHandler = require("./middlewares/error.middleware");
const { generalLimiter } = require("./middlewares/ratelimit.middleware");

// Routes
const systemRoutes = require("./routes/system.routes");
const articlesRoutes = require("./routes/articles.routes");

// Documentation
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const openapispec = YAML.load("./src/docs/openapi.yaml");

const app = express();
const authRoutes = require("./routes/auth.routes");

// ==================== Core parsers ====================
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// ==================== Security hardening ====================
app.use(
  cors({
    origin: "*", // untuk praktikum dulu, bisa diganti whitelist di langkah hardening lanjut
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-correlation-id"],
  })
);
app.use(helmet());
app.use(generalLimiter); // rate limit global

// ==================== Observability ====================
app.use(correlationId); // correlation id first

app.use(
  pinoHttp({
    logger,
    customProps: (req) => ({
      cid: req.correlationId,
      userid: req.user?.id, // akan terisi setelah JWT aktif
    }),
  })
);

// ==================== Routes ====================
app.use(systemRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/articles", articlesRoutes);

// ==================== Docs ====================
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapispec));

// ==================== Not found & error ====================
app.use(notFound);
app.use(errorHandler);

module.exports = app;