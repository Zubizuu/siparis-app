const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());

const dataPath = path.join(__dirname, "data", "products.json");

// Ürünleri getir
app.get("/products", (req, res) => {
  const data = fs.readFileSync(dataPath, "utf-8");
  res.json(JSON.parse(data));
});

// Yeni ürün ekle
app.post("/products", (req, res) => {
  const newProduct = req.body;

  const data = fs.readFileSync(dataPath, "utf-8");
  const products = JSON.parse(data);

  products.push(newProduct);

  fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));

  res.status(201).json({ message: "Ürün eklendi", product: newProduct });
});

app.listen(PORT, () => {
  console.log(`Server çalışıyor: http://localhost:${PORT}`);
});
