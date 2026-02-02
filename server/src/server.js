import "dotenv/config";
import express from "express";
import cors from "cors";
import productsRouter from "./products.routes.js";

const app = express();

// Cambiá esto al dominio de Netlify cuando deployemos el front
app.use(cors({ origin: "*" }));

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true, service: "app-add-product-api" });
});

app.use("/api/products", productsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ API running on http://localhost:${PORT}`));
