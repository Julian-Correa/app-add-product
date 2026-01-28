import { Router } from "express";
import { PrismaClient } from "@prisma/client";



const router = Router();
const prisma = new PrismaClient();

// GET /api/products
router.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { id: "desc" },
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo productos" });
  }
});

// POST /api/products
router.post("/", async (req, res) => {
  try {
    const { title, price, stock = 0 } = req.body;

    if (!title || price === undefined || price === null) {
      return res.status(400).json({ error: "title y price son requeridos" });
    }

    const created = await prisma.product.create({
      data: {
        title: String(title),
        price: Number(price),
        stock: Number(stock),
      },
    });

    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: "Error creando producto" });
  }
});

// PUT /api/products/:id
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, price, stock } = req.body;

    const updated = await prisma.product.update({
      where: { id },
      data: {
        ...(title !== undefined && { title: String(title) }),
        ...(price !== undefined && { price: Number(price) }),
        ...(stock !== undefined && { stock: Number(stock) }),
      },
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error actualizando producto" });
  }
});

// DELETE /api/products/:id
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.product.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Error eliminando producto" });
  }
});

export default router;
