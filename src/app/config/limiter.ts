import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

export default limiter;
