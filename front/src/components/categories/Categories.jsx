import {useEffect, useState} from 'react'

function Categories(){
    const [name, setName] = useState("")
    const [tax, setTax] = useState("")
    const [categories, setCategories] = useState([])

    const url = 'http://localhost/routes/categories.php'

    useEffect(() => {
        async function fetchCategories(){
            const response = await fetch(url)
            const data = await response.json()
            setCategories(data)
        }
        fetchCategories()
    }, [])    

    async function deleteCategoria (code){
        await fetch(`http://localhost/routes/categories.php?code=${code}`,{method: 'DELETE'})
        location.reload()
    }
    
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

    return (
        <>
            <main>
            <div className="container">
                <div className="consulta">
                    <form id="form-cat">
                        <input className="input" name="name" value={name} onChange={(e) => setName(e.target.value)} type="text" id="categoria-name" placeholder="Category..."/>
                        <input className="input" name="tax" value={tax} onChange={(e) => setTax(e.target.value)} type="number" min="1" id="tax-name" placeholder="Tax..." />
                        <button type="submit" className="button" onClick={postCategoria} id="btn" >Adicionar</button>
                    </form>
                </div>
                <div>
                    <table className="tabela">
                        <thead>
                        <tr>
                            <th className="tbl-mr">Code</th>
                            <th className="tbl-mn">Category</th>
                            <th className="tbl-mn">Tax</th>
                        </tr>
                        </thead>
                        <tbody id="tabela-categoria">
                            {categories.map((category) => (
                            <tr key={category.code}>
                                <td className='td-cat'>{category.code}</td>
                                <td className='td-cat'>{category.name}</td>
                                <td className='td-cat'>{category.tax}</td>
                                <button onClick={() => {deleteCategoria(category.code)}}>Delete</button>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            </main>
        </>
    )
    }

export default Categories