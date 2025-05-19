import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import formRoutes from "./routes/form.routes.js";
import questionRoutes from "./routes/question.routes.js";
import responseRoutes from './routes/response.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/forms", formRoutes);

app.use("/api", questionRoutes);
app.use('/api', responseRoutes);

// d'autres routes ici

export default app;
