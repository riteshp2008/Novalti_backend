import express from "express";
import cors from "cors";
import connectDB from "./config/config.js";
import UserRoutes from "./Routes/UserRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Novelty Solutions");
});

app.use("/api/users", UserRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

