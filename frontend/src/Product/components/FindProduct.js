import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function FindProduct() {
    const [productArr, setProductArr] = useState([]);
    const [pgno, setPgno] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState("");

    const size = 10;
    const sorting = "productId";
    const asc = true;

    useEffect(() => {
        const token = localStorage.getItem("token"); // ✅ get token

        axios.get(`http://localhost:9011/product/fetchAllPaginated?pgno=${pgno}&size=${size}&sorting=${sorting}&asc=${asc}`, {
            headers: {
                Authorization: `Bearer ${token}` // ✅ send token explicitly
            }
        })
        .then((res) => {
            setProductArr(res.data.content);
            setTotalPages(res.data.totalPages);
        })
        .catch((err) => {
            if (err.response) {
                if (err.response.status === 403) {
                    setError("Access denied. You don't have permission to view products.");
                } else {
                    setError("Error " + err.response.status + ": " +
                        (err.response.data?.error || JSON.stringify(err.response.data)));
                }
            } else {
                setError("Network error: " + err.message);
            }
        });
    }, [pgno]);

    return (
        <div className="container-fluid mt-2">
            <div className="card border-0 shadow-sm">

                {/* Header */}
                <div className="card-header py-3 d-flex justify-content-between align-items-center"
                    style={{ background: 'linear-gradient(135deg, #1e3a5f, #0f3460)' }}>
                    <h5 className="text-white mb-0">
                        <i className="bi bi-box-seam-fill me-2"></i>All Products
                    </h5>
                    <Link to="/Product/createProduct"
                        className="btn btn-sm btn-light d-flex align-items-center gap-1">
                        <i className="bi bi-plus-circle-fill me-1"></i> Add Product
                    </Link>
                </div>

                <div className="card-body p-0">
                    {error && (
                        <div className="alert alert-danger m-3 d-flex align-items-center gap-2">
                            <i className="bi bi-exclamation-triangle-fill"></i>
                            {error}
                        </div>
                    )}

                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead style={{ background: '#f8fafc' }}>
                                <tr>
                                    <th className="ps-4" style={{ fontSize: 12, color: '#64748b' }}>ID</th>
                                    <th style={{ fontSize: 12, color: '#64748b' }}>SKU</th>
                                    <th style={{ fontSize: 12, color: '#64748b' }}>NAME</th>
                                    <th style={{ fontSize: 12, color: '#64748b' }}>CATEGORY</th>
                                    <th style={{ fontSize: 12, color: '#64748b' }}>ATTRIBUTES</th>
                                    <th style={{ fontSize: 12, color: '#64748b' }}
                                        className="text-center">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productArr.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-5 text-muted">
                                            <i className="bi bi-inbox fs-2 d-block mb-2"></i>
                                            No products found
                                        </td>
                                    </tr>
                                ) : (
                                    productArr.map((p) => (
                                        <tr key={p.productId}>
                                            <td className="ps-4 text-muted" style={{ fontSize: 13 }}>
                                                #{p.productId}
                                            </td>
                                            <td>
                                                <span className="badge bg-primary bg-opacity-10 text-primary px-2 py-1">
                                                    {p.sku}
                                                </span>
                                            </td>
                                            <td className="fw-semibold" style={{ fontSize: 13 }}>
                                                {p.name}
                                            </td>
                                            <td>
                                                <span className="badge bg-success bg-opacity-10 text-success px-2 py-1">
                                                    {p.category}
                                                </span>
                                            </td>
                                            <td className="text-muted" style={{ fontSize: 12 }}>
                                                {p.attributes || '—'}
                                            </td>
                                            <td className="text-center">
                                                <Link to={`/Product/editProduct/${p.productId}`}
                                                    className="btn btn-sm btn-outline-warning me-1">
                                                    <i className="bi bi-pencil"></i>
                                                </Link>
                                                <Link to={`/Product/deleteProduct/${p.productId}`}
                                                    className="btn btn-sm btn-outline-danger">
                                                    <i className="bi bi-trash"></i>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="d-flex justify-content-between align-items-center px-4 py-3 border-top">
                        <span className="text-muted" style={{ fontSize: 12 }}>
                            Page {pgno + 1} of {totalPages}
                        </span>
                        <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-outline-primary"
                                onClick={() => setPgno(pgno - 1)}
                                disabled={pgno === 0}>
                                <i className="bi bi-chevron-left"></i> Previous
                            </button>
                            <button className="btn btn-sm btn-outline-primary"
                                onClick={() => setPgno(pgno + 1)}
                                disabled={pgno + 1 >= totalPages}>
                                Next <i className="bi bi-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}