import express, { Application } from "express";
import bodyParser from "body-parser";
import emissionsRouter from "./routes/emissions";
import cors from "cors";

// Initialize Express app
const app: Application = express();
const PORT = 8000;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  }),
);

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/emissions", emissionsRouter);
app.post("/api/test");

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
