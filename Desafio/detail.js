const urlOrdersItem = "http://localhost/routes/ordersItem.php";
const getOrdersItem = fetch(urlOrdersItem).then((res) => { return res.json(); });
const tabelaDetalhes = document.getElementById('tabela-detelhes')

async function showTable (){
    
    const readOrdersItem = await getOrdersItem
    const dbOrdersItem = await readOrdersItem

    tabelaDetalhes.innerHTML = ""
    dbOrdersItem.forEach(orderitem => {const tr = document.createElement("tr")
    tr.innerHTML = `
        <tr>
            <td class="tbl-mn"> ${orderitem.code}</td>
            <td class="tbl-mn"> ${orderitem.product_code}</td>
            <td class="tbl-mn"> ${orderitem.amount}</td>
            <td class="tbl-mn">$ ${orderitem.price}</td>
            <td class="tbl-mn">$ ${orderitem.tax}</td>
        </tr>`;
            tabelaDetalhes.appendChild(tr)
    });

}
showTable();