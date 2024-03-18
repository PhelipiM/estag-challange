import {useEffect, useState} from 'react'

function details (){

    const url = 'http://localhost/routes/ordersItem.php'
    const [ordersItem, setOrderItem] = useState([])

    useEffect(() => {
        async function fecthOrderItem(){
            const response = await fetch(url)
            const data = await response.json()
            setOrderItem(data)
        }
        fecthOrderItem()
    },[])
    

    return(
    <main>
        <table class="tabela">
            <thead>
                <tr>
                    <th class="tbl-mr">Code</th>
                    <th class="tbl-mn">Product</th>
                    <th class="tbl-mn">Amount</th>
                    <th class="tbl-mn">Unit price</th>
                    <th class="tbl-mn">Tax</th>
                </tr>
            </thead>
            <tbody id="tabela-detelhes">
                {ordersItem.map((products) =>(
                    <tr key={products.code}>
                        <td class="tbl-mn">{products.code}</td>
                        <td class="tbl-mn">{products.product_code}</td>
                        <td class="tbl-mn">{products.amount}</td>
                        <td class="tbl-mn">${products.price}</td>
                        <td class="tbl-mn">${products.tax}</td>
                    </tr>

                ))}
            </tbody>
        </table>
    </main>
    )
}

export default details