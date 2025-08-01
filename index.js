import app from "./app.js";
import "dotenv/config";
import redisClient from "./config/redisConfig.js";
import notFound from "./middleware/notFound.js";

import weatherRouter from "./routes/weatherRoutes.js";

import rateLimit from "express-rate-limit";


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." }
});

app.use("/api/", limiter);

app.use(`/api/v1`, weatherRouter);

app.get("/api/v1/test", (req, res) => {
  return res.status(200).json({ msg: `Weather API !` });
});

app.use(`/`, notFound);

const start = async () => {
  const port = process.env.PORT || 3000;

  try {
    await redisClient.connect();
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
