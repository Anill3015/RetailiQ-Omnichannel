import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function FindProduct() {
    const [productArr, setProductArr] = useState([]);
    const [pgno, setPgno] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
<<<<<<< HEAD

    const size = 2;
=======
    const [error, setError] = useState("");

    const size = 10;
>>>>>>> Rakesh
    const sorting = "productId";
    const asc = true;

    useEffect(() => {
        axios.get(`http://localhost:9011/product/fetchAllPaginated?pgno=${pgno}&size=${size}&sorting=${sorting}&asc=${asc}`)
            .then((res) => {
                setProductArr(res.data.content);
                setTotalPages(res.data.totalPages);
            })
<<<<<<< HEAD
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
=======
            .catch((err) => {
                if (err.response) {
                    setError("Error: " + err.response.data?.error || err.response.status);
                } else {
                    setError("Network error: " + err.message);
                }
            });
    }, [pgno]);

    return (
        <div className="container mt-4">
            <h2 className="mb-3">All Products</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>SKU</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productArr.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    No products found
                                </td>
                            </tr>
                        ) : (
                            productArr.map((p) => (
>>>>>>> Rakesh
                                <tr key={p.productId}>
                                    <td>{p.productId}</td>
                                    <td>{p.sku}</td>
                                    <td>{p.name}</td>
                                    <td>{p.category}</td>
                                    <td>
<<<<<<< HEAD
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
=======
                                        <Link to={`/Product/editProduct/${p.productId}`}
                                            className="btn btn-warning btn-sm me-2">Edit</Link>
                                        <Link to={`/Product/deleteProduct/${p.productId}`}
                                            className="btn btn-danger btn-sm">Delete</Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="d-flex align-items-center gap-2 mt-2">
                <button
                    className="btn btn-outline-primary btn-sm"
>>>>>>> Rakesh
                    onClick={() => setPgno(pgno - 1)}
                    disabled={pgno === 0}>
                    Previous
                </button>
<<<<<<< HEAD
                &nbsp;
                <span>Page {pgno + 1} of {totalPages}</span>
                &nbsp;
                <button
=======
                <span>Page {pgno + 1} of {totalPages}</span>
                <button
                    className="btn btn-outline-primary btn-sm"
>>>>>>> Rakesh
                    onClick={() => setPgno(pgno + 1)}
                    disabled={pgno + 1 >= totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}