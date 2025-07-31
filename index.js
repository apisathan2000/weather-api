import app from "./app.js";
import "dotenv/config";
import redisClient from "./config/redisConfig.js";


import weatherRouter from "./routes/weatherRoutes.js";

app.use(`/api/v1`, weatherRouter);

app.get("/api/v1/test", (req, res) => {
  return res.status(200).json({ msg: `Weather API !` });
});

const start = async () => {
  const port = process.env.PORT || 3000;

  try {
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });

    await redisClient.connect();
    

  } catch (error) {
    console.log(error);
  }
};

start();
