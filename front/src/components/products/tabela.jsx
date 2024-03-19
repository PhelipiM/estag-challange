import {useEffect, useState} from 'react';

function Tabela (){

    const url = 'http://localhost/routes/products.php'
    
    const [products, setProducts] = useState([])
    
    useEffect(() => {
        async function fetchProduct(){
            const response = await fetch(url)
            const data = await response.json()
            setProducts(data)
        }
        fetchProduct()
    }, [])  


    async function deleteButtom (code){
        await fetch(`http://localhost/routes/products.php?code=${code}`,{method: 'DELETE'})
        location.reload()
    }


    return(
        <tbody id="tabela-produto">
        {products.map((product) => (
            <tr key={product}>
                <td className='td-cat'>{product.category_code}</td>
                <td className='td-cat'>{product.name}</td>
                <td className='td-cat'>{product.amount}</td>
                <td className='td-cat'>{product.price}</td>
                <td className='td-cat'>{product.name_category}</td>
                <button onClick={() =>{deleteButtom(product.code)}} >Delete</button>
            </tr>
        ))}
    </tbody>
    )
}

export default Tabela