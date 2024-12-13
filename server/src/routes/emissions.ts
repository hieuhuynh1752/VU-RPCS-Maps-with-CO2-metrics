import express, { Request, Response } from "express";
import emissionFactors from "../data/emissionFactors.json";

const router = express.Router();

// Type definitions
interface EmissionFactors {
  [key: string]: number;
}

// Helper function to calculate CO₂ emissions
const calculateEmissions = (
  distance: number,
  type: string,
  vehicleType?: string,
): number => {
  const factors = emissionFactors as EmissionFactors;
  let factor = factors[type];
  if (type === "transit" && !!vehicleType) {
    factor = factors[vehicleType];
  }
  return (distance / 1000) * factor; // Convert distance to km and calculate emissions
};

// POST API to calculate emissions
router.post("/calculate", (req: Request, res: Response) => {
  try {
    const { steps } = req.body;

    if (!Array.isArray(steps)) {
      return res
        .status(400)
        .json({ error: "Invalid input: 'steps' must be an array." });
    }

    const enrichedSteps = steps.map((step) => {
      const { distance, vehicleType, type } = step;
      const co2 = calculateEmissions(distance, type, vehicleType);
      return { ...step, co2: parseFloat((co2 / 1000).toFixed(2)) }; // Add calculated kgCO₂ to the step
    });

    res.status(200).json({ steps: enrichedSteps });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// GET API for supported modes and factors
router.get("/factors", (_req: Request, res: Response) => {
  res.status(200).json(emissionFactors);
});

export default router;
