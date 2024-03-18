import { Route, Routes, BrowserRouter} from "react-router-dom"
 
import Categorie from '../components/categories/Categories';
import Index from '../components/index/index';
import Products from '../components/products/Products';
import History from '../components/history/history';
import Details from '../components/Details/details';


const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route Component = { Index } exact path="/"/>
                <Route Component = { Categorie } path="/categories"/>
                <Route Component = { Products } path="/products" />
                <Route Component = { History } path="/history" />
                <Route Component = { Details } path="/Details" />
            </Routes>
        </BrowserRouter>
    )
}
 
export default Router;