import {useEffect, useState} from 'react'

function Tabela (){

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

    async function deleteCategoria (code){
        await fetch(`http://localhost/routes/categories.php?code=${code}`,{method: 'DELETE'})
        location.reload()
    }

    return(
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
    )
}
export default Tabela 