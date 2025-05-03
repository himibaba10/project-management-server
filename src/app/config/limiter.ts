import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  limit: 40,
  standardHeaders: true,
  legacyHeaders: false,
});

export default limiter;
