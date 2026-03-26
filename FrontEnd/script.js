const form = document.getElementById("AddForm");
const list = document.getElementById("ProductsList");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("ProductName").value;
  const purchase = Number(document.getElementById("PurchasePrice").value);
  const selling = Number(document.getElementById("SellingPrice").value);
  const profit = selling - purchase;
  const profitColor = profit >=0 ? "green" : "red";

  const item = document.createElement("li");
  item.innerHTML = `
  ${name} | Compra:${purchase} | Venda:${selling} | Lucro:${profit}
  <button onclick="this.parentElement.remove()">Excluir</button>`;

  list.appendChild(item);
  form.reset();
});



