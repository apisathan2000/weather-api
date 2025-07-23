import app from "./app.js";
import "dotenv/config";

app.get("/api/v1/test", (req, res) => {
  return res.status(200).json({ msg: `Weather API !` });
});

const start = () => {
  const port = process.env.PORT || 3000;

  try {
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
