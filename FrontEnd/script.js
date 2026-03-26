const form = document.getElementById("AddForm");
const list = document.getElementById("ProductsList");

let products = [];
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("ProductName").value;
  const quantity = Number(document.getElementById("Quantity").value);
  const purchase = Number(document.getElementById("PurchasePrice").value);
  const selling = Number(document.getElementById("SellingPrice").value);
  const profit = calculateProfit(purchase, selling, quantity);
  const profitColor = profit >= 0 ? "green" : "red";

  const product = {
    name,
    quantity,
    purchase,
    selling,
  };
  products.push(product);
  saveProducts();
  renderProducts();

  const item = document.createElement("li");
  item.innerHTML = `
  ${name} | Quantidade: ${quantity} | Valor Unitário: ${formatCurrency(purchase)} | Valor de Venda Unitária: ${formatCurrency(selling)} | 
  <span style="color:${profitColor}"> Lucro: ${formatCurrency(profit)}</span>
  <button onclick="this.parentElement.remove()">Excluir</button>`;

  list.appendChild(item);
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

function loadProducts() {
  const data = localStorage.getItem("products");

  if (data) {
    products = JSON.parse(data);
  }
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
      <button onclick="removeProduct(${index})">Excluir</button>
    `;

    list.appendChild(item);
  });
}
// Remover Item do LocalStorage
function removeProduct(index) {
  products.splice(index, 1);
  saveProducts();
  renderProducts;
}
// Inicializar Local Storage
loadProducts();
// Fim LocalStorage
