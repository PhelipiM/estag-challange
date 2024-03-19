import Tabela from './tabela'
import Form from './form'

function Categories(){

    return (
        <>
            <main>
            <div className="container">
                <Form />
                <div>
                <table className="tabela">
                <thead>
                    <tr>
                        <th className="tbl-mr">Code</th>
                        <th className="tbl-mn">Category</th>
                        <th className="tbl-mn">Tax</th>
                    </tr>
                </thead>
                <Tabela />
                </table>
                </div>
            </div>
            </main>
        </>
    )
    }

export default Categories