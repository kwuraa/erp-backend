import express from "express";

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "API funcionando",
  });
});

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Mouse",
    price: 80,
    stock: 15,
  },
  {
    id: 2,
    name: "Monitor",
    price: 900,
    stock: 5,
  },
  {
    id: 3,
    name: "Teclado",
    price: 100,
    stock: 20,
  },
];

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const produtoId: number = parseInt(req.params.id, 10);

  const selectedProduct = products.find((prod) => prod.id === produtoId);

  if (selectedProduct) {
    res.json(selectedProduct);
  } else {
    res.status(404).json({
      error: "item não existe",
    });
  }
});

app.post("api/products", (req, res) => {
  const { name, price, stock } = req.body;

  const id = products.length + 1;

  const newProduct: Product = {
    id: id,
    name: name,
    price: price,
    stock: stock,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.delete("api/products/:id", (req, res) => {
  const id: number = parseInt(req.params.id, 10);
  const index = products.findIndex((produto) => produto.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "produto não encontrado!!",
    });
  }
  products.splice(index, 1);
  res.status(204).send();
});

app.listen(3000, () => {
  console.log("API rodando em http://localhost:3000");
});
