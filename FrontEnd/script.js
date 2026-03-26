const form = document.getElementById("AddForm");
const list = document.getElementById("ProductsList");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("ProductName").value;
  const purchase = Number(document.getElementById("PurchasePrice").value);
  const selling = Number(document.getElementById("SellingPrice").value);
  const quantity = Number(document.getElementById("Quantity").value);

  const profit = calculateProfit(purchase, selling, quantity);
  const profitColor = profit >= 0 ? "green" : "red";

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
