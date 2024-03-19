import {useEffect, useState} from 'react'
function Form (){
   
    const [name, setName] = useState("")
    const [tax, setTax] = useState("")
    const url = 'http://localhost/routes/categories.php'

   
    async function postCategoria(event){
        event.preventDefault()
        const category = {
            name,
            tax
        }
        console.log(category)
        const data = new FormData()
        data.append("name", name)
        data.append("tax" , tax)
        
        fetch(url,{
            method: "POST", 
            body: data
            },
            window.location.reload()
        )
    }

    return(
        <div className="consulta">
        <form id="form-cat">
            <input className="input" name="name" value={name} onChange={(e) => setName(e.target.value)} type="text" id="categoria-name" placeholder="Category..."/>
            <input className="input" name="tax" value={tax} onChange={(e) => setTax(e.target.value)} type="number" min="1" id="tax-name" placeholder="Tax..." />
            <button type="submit" className="button" onClick={postCategoria} id="btn" >Adicionar</button>
        </form>
        </div>
        
    )
}
export default Form