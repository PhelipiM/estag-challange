function NavBar(){

    return(    
    <header className="header">
        <nav>
            <h1> Suite Store</h1>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/products">Products</a></li>
                <li><a href="/categories">Categories</a></li>
                <li><a href="/history">History</a></li>
            </ul>
        </nav>
    </header>
    )
}

export default NavBar