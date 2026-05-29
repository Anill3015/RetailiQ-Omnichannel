import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function FindPriceList() {
    const [priceListArr, setPriceListArr] = useState([]);
    const [pgno, setPgno] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState("");

    const size = 10;
    const sorting = "priceListId";
    const asc = true;

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`http://localhost:9011/pricelist/fetchAllPaginated?pgno=${pgno}&size=${size}&sorting=${sorting}&asc=${asc}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setPriceListArr(res.data.content);
                setTotalPages(res.data.totalPages);
            })
            .catch((err) => {
                setError("Error: " + err.message);
            });
    }, [pgno]);

    return (
        <div className="container mt-4">
            <h2 className="mb-3">All PriceLists</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Currency</th>
                            <th>Price</th>
                            <th>Effective From</th>
                            <th>Effective To</th>
                            <th>Product</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {priceListArr.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    No price lists found
                                </td>
                            </tr>
                        ) : (
                            priceListArr.map((pl) => (
                                <tr key={pl.priceListId}>
                                    <td>{pl.priceListId}</td>
                                    <td>{pl.currency}</td>
                                    <td>{pl.price}</td>
                                    <td>{new Date(pl.effectiveFrom).toLocaleString()}</td>
                                    <td>{new Date(pl.effectiveTo).toLocaleString()}</td>
                                    <td>{pl.product ? pl.product.name : "N/A"}</td>
                                    <td>
                                        <Link to={`/PriceList/editPriceList/${pl.priceListId}`}
                                            className="btn btn-warning btn-sm me-2">Edit</Link>
                                        <Link to={`/PriceList/deletePriceList/${pl.priceListId}`}
                                            className="btn btn-danger btn-sm">Delete</Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="d-flex align-items-center gap-2 mt-2">
                <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => setPgno(pgno - 1)}
                    disabled={pgno === 0}>
                    Previous
                </button>
                <span>Page {pgno + 1} of {totalPages}</span>
                <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => setPgno(pgno + 1)}
                    disabled={pgno + 1 >= totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}