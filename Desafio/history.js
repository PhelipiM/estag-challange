const url = "http://localhost/routes/orders.php";
const getOrders = fetch(url).then((res) => { return res.json(); });
const tabelaHistory = document.getElementById('tabela-hitory')



async function showTable (){
    
    const readOrders = await getOrders
    const dbOrders = await readOrders

    tabelaHistory.innerHTML = ""
    dbOrders.forEach(order => {const tr = document.createElement("tr")
    tr.innerHTML = `
            <tr>
            <td class="tbl-mn"> ${order.code}</td>
            <td class="tbl-mn" id="total-table">$ ${order.tax}</td>
            <td class="tbl-mn">$ ${order.total}</td>
            </tr>`;
            tabelaHistory.appendChild(tr)
    });

}
showTable();