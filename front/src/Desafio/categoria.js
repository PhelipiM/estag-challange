const url = 'http://localhost/routes/categories.php'
const formCat = document.getElementById("form-cat")
const tabelaCategoria = document.getElementById("tabela-categoria");
const getCategorias = fetch(url).then((res) => { return res.json(); });


function postCategoria(){
    formCat.addEventListener("submit", async event=> {
        event.preventDefault()
        const data = new FormData(formCat)
        try{
            const res = await fetch(url, {
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
    
    await fetch(`http://localhost/routes/categories.php?code=${code}`,deleteCat)
    showTable()
    window.location.reload()
}

  
async function showTable() {
    const readCategorias = await getCategorias
    const dbCategorias = readCategorias

    tabelaCategoria.innerHTML = ""

    dbCategorias.forEach(categories => {const tr = document.createElement("tr")
    tr.innerHTML = `
        <td class="tbl-mr">${categories.code}</td>
        <td class="tbl-mn">${categories.name}</td>
        <td class="tbl-mn">${categories.tax}$</td>
        <button onclick="deleteCategoria(${categories.code})">Delete</button>`

    tabelaCategoria.appendChild(tr)
    
})
}
showTable() 