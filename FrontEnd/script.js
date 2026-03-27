const form = document.getElementById("AddForm");
const list = document.getElementById("ProductsList");

let products = [];
let editingId = null;
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const product = {
    name: document.getElementById("ProductName").value,
    quantity: Number(document.getElementById("Quantity").value),
    purchase: Number(document.getElementById("PurchasePrice").value),
    selling: Number(document.getElementById("SellingPrice").value),
  };
  if (editingId) {
    await fetch(`https://controle-de-produtos-c2m1.onrender.com/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    editingId = null;
  } else {
    await fetch("https://controle-de-produtos-c2m1.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
  }
  loadProducts(); // recarrega da API
  form.reset();
});

// Funções

function calculateProfit(purchase, selling, quantity) {
  return (selling - purchase) * quantity;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

// Fim das Funções

// LocalStorage

function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

async function loadProducts() {
  const res = await fetch("https://controle-de-produtos-c2m1.onrender.com");
  products = await res.json();

  renderProducts();
}

function renderProducts() {
  list.innerHTML = "";

  products.forEach((product, index) => {
    const profit = calculateProfit(
      product.purchase,
      product.selling,
      product.quantity,
    );

    const profitColor = profit >= 0 ? "green" : "red";

    const item = document.createElement("li");
    item.innerHTML = `
      ${product.name} | 
      Quantidade: ${product.quantity} | 
      Compra: ${formatCurrency(product.purchase)} | 
      Venda: ${formatCurrency(product.selling)} | 
      <span style="color:${profitColor}">
        Lucro: ${formatCurrency(profit)}
      </span>
      <button onclick="editProduct('${product._id}')">Editar</button>
      <button onclick="removeProduct('${product._id}')">Excluir</button>
    `;

    list.appendChild(item);
  });
  updateTotalProfit();
}
// Remover Item
async function removeProduct(id) {
  await fetch(`https://controle-de-produtos-c2m1.onrender.com/${id}`, {
    method: "DELETE",
  });

  loadProducts();
}

loadProducts();

// Cálculo Total Dashboard

function calculateTotalProfit() {
  let total = 0;

  products.forEach((p) => {
    total += calculateProfit(p.purchase, p.selling, p.quantity);
  });
  return total;
}

function updateTotalProfit() {
  const totalElement = document.getElementById("totalProfit");
  const total = calculateTotalProfit();
  const color = total >= 0 ? "green" : "red";

  totalElement.innerHTML = `Lucro Total: <span style="color:${color}">
      ${formatCurrency(total)}
    </span>`;
}

function editProduct(id) {
  const product = products.find((p) => p._id === id);

  document.getElementById("ProductName").value = product.name;
  document.getElementById("Quantity").value = product.quantity;
  document.getElementById("PurchasePrice").value = product.purchase;
  document.getElementById("SellingPrice").value = product.selling;

  editingId = id;
}
