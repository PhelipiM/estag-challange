const urlProdutos = "http://localhost/routes/products.php"
const urlCategoria = "http://localhost/routes/categories.php"

const formProduto = document.getElementById("form-prod")
const tabelaProduto = document.getElementById("tabela-produto")
const selectCategorias = document.getElementById('select-prod')
const getProdutos = fetch(urlProdutos).then((res) => { return res.json(); });
const getCategorias = fetch(urlCategoria).then((res) => { return res.json(); });


async function preencherProduto() {
    const dbCategorias = await getCategorias;
    dbCategorias.forEach((categoria)=> {
    selectCategorias.innerHTML += `<option value="${categoria.code}">${categoria.name}</option>`;
    } )
    }
    preencherProduto()

function postProdutos(){
    formProduto.addEventListener("submit", async event=> {
        event.preventDefault()
        const data = new FormData(formProduto)
        try{
            const res = await fetch(urlProdutos, {
                method: "POST",
                body: data

            },
            window.location.reload()
            )
        } catch(error){
            console.log(error.message)
        }
    })
}
async function deleteCategoria (code){
    const deleteCat = {method: 'DELETE'};
    
    await fetch(`http://localhost/routes/products.php?code=${code}`,deleteCat)
    window.location.reload()
    showTable()
}

async function showTable (){
    
    const readProdutos = await getProdutos
    const dbProdutos = await readProdutos

    tabelaProduto.innerHTML = ""
    dbProdutos.forEach(produtos => {const tr = document.createElement("tr")
    tr.innerHTML = `
            <tr> 
                <td class="tbl-mr">${produtos.code}</td>
                <td class="tbl-mn">${produtos.name}</td>
                <td class="tbl-mn">${produtos.amount}</td>
                <td class="tbl-mn">$${produtos.price}</td>
                <td class="tbl-mn">${produtos.name_category}</td>
                <button onclick="deleteCategoria(${produtos.code})">Delete</button>
            </tr>`
            tabelaProduto.appendChild(tr)
    });

}
showTable() 
