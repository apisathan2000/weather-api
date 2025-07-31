import express from "express";
import { getWeatherData } from "../controllers/weatherController.js";
import validateSchema from "../middleware/schemaValidation.js";
import { weatherSchema } from "../validation/weatherRouteValidation.js";

const router = express.Router();

router.post(
  `/weather`,
  validateSchema({schema:weatherSchema}),
  getWeatherData
);

export default router;
