let AddCarrinho = [];
let AddHistorico = [];
const urlProdutos = "http://localhost/routes/products.php?action=postsemem&tax=800&total=400"
const urlOrders = "http://localhost/routes/orders.php"
const urlOrdersItem = "http://localhost/routes/ordersItem.php"
const getOrders = fetch(urlOrders).then((res) => { return res.json(); });
const getProdutos = fetch(urlProdutos).then((res) => { return res.json(); });


const selectProduto = document.getElementById('Products');
const carrinhoAmount = document.getElementById('amount-home');
const carrinhoTax = document.getElementById('tax-home');
const carrinhoPrice = document.getElementById('price-home');
const btnProduto = document.getElementById("btn-home");
const tabelaHome = document.getElementById("tabela-home");

const formCarrinho = document.getElementById('form-carrinho')
const carrinhoTotal = document.getElementById('index-total')
const carrinhoTaxa = document.getElementById('index-tax')
const finishTotal = document.getElementById('finish')


async function preencherProduto() {
  const dbProdutos = await getProdutos;
  console.log(dbProdutos)
  dbProdutos.forEach((produto) => {
    selectProduto.innerHTML += `<option value="${produto.code}">${produto.name}</option>`;

  })
}
preencherProduto()

selectProduto.addEventListener("change", changeFormValues);

async function changeFormValues() {
  let dbProdutos = await getProdutos;
  const produtos = dbProdutos

  const produtoNome = document.getElementById("Products").value;
  const produtoSelecionado = produtos.find((p) => p.code == produtoNome)

  if (produtoSelecionado) {
    const taxedUnitPrice = (produtoSelecionado.price * (produtoSelecionado.tax_category / 100));
    carrinhoTax.value = (taxedUnitPrice).toFixed(2);
    carrinhoPrice.value = produtoSelecionado.price;
  }

}

function saveLocalStorage() {
  const dbCarrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  AddCarrinho.push(...dbCarrinho);
  showTable();
}

async function addCarrinho(e) {
  e.preventDefault();
  const dbProdutos = await getProdutos;
  const produtoSelecionado = selectProduto.value;
  const prodteste = dbProdutos.find(i => i.code == produtoSelecionado)
  const cartItem = {
    code: prodteste.code, name: prodteste.name, amount: carrinhoAmount.value, price: carrinhoPrice.value, tax: carrinhoTax.value
  }
  AddCarrinho.push(cartItem);
  localStorage.setItem('carrinho', JSON.stringify(AddCarrinho));
  showTable();
}

function deleteCarrinho(index) {
  AddCarrinho.splice(index, 1);
  localStorage.setItem('carrinho', JSON.stringify(AddCarrinho));
  showTable();
}

function showTable() {
  let totalCarrinho = 0;
  let totalTax = 0;
  let Lista = '';
  AddCarrinho.forEach((cartItem, index) => {
    const contaTax = cartItem.tax * cartItem.amount;
    const totalItem = cartItem.amount * cartItem.price;
    totalTax += contaTax;
    totalCarrinho += totalItem;
    Lista += `
            <tr> 
                <td class="tbl-mn">${cartItem.name}</td>
                <td class="tbl-mn">$${cartItem.price}</td>
                <td class="tbl-mn">${cartItem.amount}</td>
                <td class="tbl-mn" id="total-table">$${totalItem}</td>
                <td class=""><button onclick='deleteCarrinho(${index})'>Deletar</button></td>
            </tr>`;
  });
  tabelaHome.innerHTML = Lista;
  carrinhoTotal.value = totalCarrinho;
  carrinhoTaxa.value = totalTax;
}

btnProduto.addEventListener('click', addCarrinho);
saveLocalStorage();



function cancelCart() {
  localStorage.removeItem('carrinho')
  showTable();
}

function objDataToFormData(obj) {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
}

async function postOrder(orderData) {
  try {
    const res = await fetch(urlOrders, {
      method: "POST",
      body: orderData,
    }).then(async (res) => {
      console.log(await res.text())
    })
  } catch (error) {
    console.log(error.message);
  }
}

async function postOrderItem(orderItemData) {
  try {
    const res = await fetch(urlOrdersItem, {
      method: "POST",
      body: orderItemData,
    }).then(async (res) => {
      console.log(await res.text())
    })
  } catch (error) {
    console.log(error.message);
  }
}

async function createHistory(e) {
  e.preventDefault()
  const dbCarrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  let code = 1
  const response = fetch(urlOrders).then(res => res.json())
  const orders = await response
  console.log(orders.length)
  const order = {
    // code: code,
    total: document.getElementById("index-total").value,
    tax: document.getElementById("index-tax").value,
  };
  console.log(order);
  const orderData = objDataToFormData(order);
  await postOrder(orderData);

  for (item of dbCarrinho) {
    console.log(item)
    const orderItem = {
      order_code: code,
      product_code: item.code,
      amount: item.amount,
      price: item.price,
      tax: item.tax,
    };

    let orderItemData = objDataToFormData(orderItem);
    await postOrderItem(orderItemData);

  }
  showTable();
}
