import Form from './form';
import Tabela from './tabela';

function Products () {

    return (
        <>
            <div className="container">
                <Form />
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
                    <Tabela />
                </table>
                </div>
            </div>
        </>
    )
}

export default Products