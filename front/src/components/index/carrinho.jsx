
function Carrinho({taxCarrinho, totalCarrinho, createHistory}){

    return(
        <form id="form-carrinho" >
        <label className="tax-t" htmlFor="Tax" >Tax:</label>
        <input className="Input-t" type="text" value={taxCarrinho} id="index-tax" name="tax" disabled />
        <label className="total-t" htmlFor="Total">Total:</label>
        <input className="Input-t" type="text" value={totalCarrinho} id="index-total" name="total" disabled />
        <button className="btn-t" onClick={createHistory} type="submit" id="finish">finish</button>
    </form>
    )
}
export default Carrinho