import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function FindProduct() {
    const [productArr, setProductArr] = useState([]);
    const [pgno, setPgno] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const size = 2;
    const sorting = "productId";
    const asc = true;

    useEffect(() => {
        axios.get(`http://localhost:9011/product/fetchAllPaginated?pgno=${pgno}&size=${size}&sorting=${sorting}&asc=${asc}`)
            .then((res) => {
                setProductArr(res.data.content);
                setTotalPages(res.data.totalPages);
            })
            .catch((err) => alert(err.message));
    }, [pgno]);

    return (
        <div>
            <h2>All Products</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>SKU</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productArr.map((p) => {
                            return (
                                <tr key={p.productId}>
                                    <td>{p.productId}</td>
                                    <td>{p.sku}</td>
                                    <td>{p.name}</td>
                                    <td>{p.category}</td>
                                    <td>
                                        <Link to={`/Product/editProduct/${p.productId}`}>Edit</Link>
                                        &nbsp;&nbsp;
                                        <Link to={`/Product/deleteProduct/${p.productId}`}>Delete</Link>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>

            <div>
                <button
                    onClick={() => setPgno(pgno - 1)}
                    disabled={pgno === 0}>
                    Previous
                </button>
                &nbsp;
                <span>Page {pgno + 1} of {totalPages}</span>
                &nbsp;
                <button
                    onClick={() => setPgno(pgno + 1)}
                    disabled={pgno + 1 >= totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}