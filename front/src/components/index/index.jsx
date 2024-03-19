import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart, removeProductToCart } from "../../redux/cart/actions";
import rootReducer from "../../redux/root-reducer";
import Carrinho from "./carrinho";

function index() {
    const url = 'http://localhost/routes/products.php'
    const urlOrder = 'http://localhost/routes/orders.php'
    const urlOrderItem = 'http://localhost/routes/ordersItem.php'

    const [product, setProducts] = useState([])
    const [prods, setProds] = useState({})
    const [selectedProduct, setSelectProdut] = useState(0)
    let [amount, setAmount] = useState([])
    let [price, setPrice] = useState([])
    let [tax, setTax] = useState([])
    const { cartProducts } = useSelector((rootReducer) => rootReducer.cartReducer);
    let [taxCarrinho, setTaxCarrinho] = useState([])
    let [totalCarrinho, setTotal] = useState([])
    async function fetchProducts() {
        setProducts([])
        const res = await fetch(url)
        const dataCat = await res.json()
        setProducts(dataCat)
    }
    
    useEffect(() => {
        fetchProducts()
    }, [prods])
    
    useEffect(() => {
        changeSelect()
    }, [selectedProduct])
    
    function changeSelect() {
        const objProduct = product.find(item => {
            if (item.code == selectedProduct) return item
        })
        if (objProduct) {
            setPrice(objProduct.price)
            setTax(objProduct.tax_category)
            setProds(objProduct)
        }
    }
    
    const dispatch = useDispatch()
    const handleProductClick = (e) => {
        e.preventDefault();
        const { name } = prods
        const { code } = prods
        console.log(prods)
        dispatch(addProductToCart({code, name, amount, price, tax }))
    }
    const handleRemoveClick = (index) => {
        dispatch(removeProductToCart(index))
    };


    function carrinhoTT() {
        setTotal(0)
        setTaxCarrinho(0)
        if (cartProducts.length) {
            let carrinhoTotal = 0
            let carrinhoTax = 0

            cartProducts.forEach((i) => {
                carrinhoTotal += (i.amount * i.price)
                carrinhoTax += (i.amount * i.tax)
            })
            setTotal(carrinhoTotal)
            setTaxCarrinho(carrinhoTax)
        }
    }

    function objDataToFormData(obj) {
        const formData = new FormData();
        Object.entries(obj).forEach(([key, value]) => {
            formData.append(key, value);
        });
        return formData;
    }

    useEffect(() => {
        carrinhoTT()
    }, [cartProducts])

    async function postOrder(orderData){
        await fetch(urlOrder,{
            method: "POST",
            body: orderData,
        })
    }
    async function postOrdersItem (orderItemData){
        await fetch (urlOrderItem,{
            method: "POST",
            body: orderItemData,
        })        
    location.reload()
    }


    async function createHistory(e) {
        e.preventDefault()
        console.log(product)
        console.log(cartProducts)
        let validaEstoque = true
        product.forEach(productEstoque => {
            cartProducts.forEach(produtoCarrinho => {
                if(productEstoque.code == produtoCarrinho.code){
                    if(productEstoque.amount < parseFloat(produtoCarrinho.amount)){
                        validaEstoque = false 
                    }
                }
            })
        })
        if(validaEstoque){
            const order = {
                code: Math.random().toString(16).slice(2),
                tax: taxCarrinho,
                total: totalCarrinho
            }
            const orderData = objDataToFormData(order);
            await postOrder(orderData)
            
            cartProducts.forEach(async(i) => {
            const orderItem = {
                order_code: order.code,
                product_code: i.code, 
                amount: i.amount,
                price : i.price,
                tax: i.tax
            }
            const orderItemData = objDataToFormData(orderItem);
            await postOrdersItem(orderItemData)
    
        })
        }
        else{
            alert("Não há itens suficientes no estoque")
        }
   
}
    return (
        <div className="container">
            <div className="consulta">
                <form id="form-index">
                    <div className="compra">
                        <select className="select" name="Products" id="Products" value={selectedProduct} onChange={(e) => setSelectProdut(e.target.value)}>
                            <option hidden>Products...</option>
                            {product.map((item) => (
                                <option key={item.code} value={item.code}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="Inputs">
                        <input className="input" id="amount-home" name="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
                        <input className="input" id="tax-home" type="number" value={price} onChange={() => setPrice()} placeholder="Tax" disabled />
                        <input className="input" id="price-home" type="number" value={tax} onChange={() => setTax()} placeholder="Price" disabled />
                        <button className="button" id="btn-home" onClick={handleProductClick}>Add Carrinho</button>
                    </div>
                </form>
            </div>
            <div>
                <table className="tabela">
                    <thead>
                        <tr>
                            <th className="tbl-mr">Product</th>
                            <th className="tbl-mn">Price</th>
                            <th className="tbl-mn">Amount</th>
                            <th className="tbl-mn">Tax</th>
                        </tr>
                    </thead>
                    <tbody id="tabela-home">
                        {cartProducts.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.tax}</td>
                                    <button onClick={handleRemoveClick}>Delete</button>
                                </tr>
                            )
                        }
                        )}
                    </tbody>
                </table>
                <div className="total">
                        <Carrinho taxCarrinho={taxCarrinho} totalCarrinho={totalCarrinho} createHistory={createHistory}/>
                </div>
            </div>
        </div>
    )
}

export default index;