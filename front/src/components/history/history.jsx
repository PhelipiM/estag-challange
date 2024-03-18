import {useEffect, useState} from 'react'
function History (){

        const url = 'http://localhost/routes/orders.php'
        const [orders, setOrders] = useState([])


        useEffect(() => {
            async function fetchOrder(){
                const response = await fetch(url)
                const data = await response.json()
                setOrders(data)
            }
            fetchOrder()
        }, [])  

    return(
        <main>
                <table class="tabela">
                    <thead>
                        <tr>
                            <th class="tbl-mr">Code</th>
                            <th class="tbl-mn">Tax</th>
                            <th class="tbl-mn">Total</th>
                        </tr>
                    </thead>
                    <tbody id ="tabela-hitory">
                    {orders.map((category) => (
                            <tr key={category.code}>
                                <td className='td-cat'>{category.code}</td>
                                <td className='td-cat'>{category.tax}</td>
                                <td className='td-cat'>{category.total}</td>
                            </tr>
                            ))}
                    </tbody>
                </table>
                <button class="bto-h"><a href="/Details">View Details</a></button>
            </main>
    )
}

export default History