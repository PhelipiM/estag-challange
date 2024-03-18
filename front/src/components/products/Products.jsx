import {useEffect, useState} from 'react';

function Products () {

    const url = 'http://localhost/routes/products.php'
    const urlCat = 'http://localhost/routes/categories.php'
    
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState(0)
    const [products, setProducts] = useState([])
    const [name, setName] = useState("")
    const [amount, setAmount] = useState("")
    const [price, setPrice] = useState("")
    
    useEffect(() => {
        async function fetchProduct(){
            const response = await fetch(url)
            const data = await response.json()
            setProducts(data)
        }
        fetchProduct()
    }, [])  
    useEffect(() => {
        async function fetchCategories(){
            const res = await fetch(urlCat)
            const dataCat = await res.json()
            setCategories(dataCat)
        }
        fetchCategories()
    },[])
  
    async function postProducts(event){
        event.preventDefault()
        const data = new FormData()
        data.append("categoryCode", category)
        data.append("name" , name)
        data.append("price" , price)
        data.append("amount" , amount)
        
        console.log(data)
        await fetch(url,{
            method: "POST", 
            body: data
            },
        )
            window.location.reload()
    }

    async function deleteButtom (code){
        await fetch(`http://localhost/routes/products.php?code=${code}`,{method: 'DELETE'})
        location.reload()
    }

    return (
        <>
            <div className="container">
                <div className="consulta">
                    <form id="form-prod">
                        <div className="compra-produto" id="form">
                        <select className="select" name="categoryCode" id="select-prod" value={category} onChange={(e)=> setCategory(e.target.value)}>
                            <option hidden>Categoria...</option>
                        {categories.map((item) => (
                            <option key={item.code} value={item.code}>{item.name}</option>
                            ))}
                        </select>
                        </div>
                        <input name="name" className="input" type="text" value={name} onChange={(e) => setName(e.target.value)} id="inp-name" placeholder="Product name..."/>
                        <input name="amount" className="input" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} id="inp-amount" placeholder="Amount..."/>
                        <input name="price" className="input" type="number" value={price} onChange={(e) => setPrice(e.target.value)} id="inp-price" placeholder="$Price..."/>
                        <button  type="submit" onClick={postProducts} className="button" id="btn" >Adicionar</button>
                    </form>
                </div>
                <div >
                <table className="tabela">
                    <thead>
                        <tr>
                            <th className="tbl-mr">Code</th>
                            <th className="tbl-mn">Product</th>
                            <th className="tbl-mn">Amount</th>
                            <th className="tbl-mn">Price</th>
                            <th className="tbl-mn">Category</th>
                        </tr>
                    </thead>
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
                </table>
                </div>
            </div>
        </>
    )
}

export default Products