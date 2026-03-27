const express = require("express");
const cors = require("cors");
const app = express();

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://Novis:Novis@cluster0.8qtfyct.mongodb.net/?appName=Cluster0",
  )
  .then(() => console.log("Banco conectado"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor Rodando");
});

const Product = require("./models/Product");
app.post("/products", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.send(product);
});

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

app.delete("/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.send("Produto removido.");
});

app.put("/products/:id", async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.send(updated);
});
