import axios from "axios";
import "dotenv/config.js";
import redisClient from "../config/redisConfig.js";

export const getWeatherData = async function (req, res, next) {
  try {
    const { location } = req.body;

    if (!location) {
      return res.status(400).json({
        error: `Location is required`,
      });
    }

    // Check cache first
    const cacheKey = `weather:${location.toLowerCase()}`;

    try {
      const cachedData = await redisClient.get(cacheKey);

      const parsedData = JSON.parse(cachedData);

      if (cachedData) {
        return res.status(200).json({
          msg: `Data fetched from cache`,
          cached: true,
          data: parsedData,
        });
      }
    } catch (cacheError) {
      console.log(`Cache read error : ${cacheError}`);
    }

    // Fetch from API if not in cache
    const response = await axios.post(
      `${process.env.VISUAL_CROSSING_BASE}/${location}?key=${process.env.VISUAL_CROSSING_KEY}`
    );

    // Store in cache with 1 hour expiration
    try {
      await redisClient.set(cacheKey, JSON.stringify(response.data), {
        expiration: {
          type: "EX",
          value: 1800,
        },
      });
    } catch (error) {
      console.log(`Cache write error: ${cacheError}`);
    }

    return res.status(200).json({
      msg: `Data fetched successfully`,
      cached: false,
      data: response.data,
    });
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json({
        error: "Weather service error",
        details: error.response.data,
      });
    }

    return res.status(500).json({
      error: "Failed to fetch weather data",
    });
  }
};
