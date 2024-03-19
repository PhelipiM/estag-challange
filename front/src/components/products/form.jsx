import {useEffect, useState} from 'react';

function Form (){

    const [name, setName] = useState("")
    const [amount, setAmount] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState(0)
    const [categories, setCategories] = useState([])

    const urlCat = 'http://localhost/routes/categories.php'
    const url = 'http://localhost/routes/products.php'


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
    useEffect(() => {
        async function fetchCategories(){
            const res = await fetch(urlCat)
            const dataCat = await res.json()
            setCategories(dataCat)
        }
        fetchCategories()
    },[])

    return(
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
    )
}
export default Form