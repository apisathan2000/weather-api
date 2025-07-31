import axios from "axios";
import "dotenv/config.js";

export const getWeatherData = function (req, res, next) {
  // axios.post(
  //   `${process.env.VISUAL_CROSSING_BASE}/${req.location}/${process.env.VISUAL_CROSSING_KEY}`
  // );

  return res.status(200).json({ msg: `Data fetched successfully` });
};
