import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function FindPromotion() {
    const [promotionArr, setPromotionArr] = useState([]);
    const [pgno, setPgno] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
<<<<<<< HEAD
=======
    const [error, setError] = useState("");
>>>>>>> Rakesh

    const size = 10;
    const sorting = "promotionId";
    const asc = true;

    useEffect(() => {
<<<<<<< HEAD
        axios.get(`http://localhost:9011/promotion/fetchAllPaginated?pgno=${pgno}&size=${size}&sorting=${sorting}&asc=${asc}`)
=======
        const token = localStorage.getItem("token");
        axios.get(`http://localhost:9011/promotion/fetchAllPaginated?pgno=${pgno}&size=${size}&sorting=${sorting}&asc=${asc}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
>>>>>>> Rakesh
            .then((res) => {
                setPromotionArr(res.data.content);
                setTotalPages(res.data.totalPages);
            })
<<<<<<< HEAD
            .catch((err) => alert(err.message));
    }, [pgno]);

    return (
        <div>
            <h2>All Promotions</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Rules</th>
                        <th>Validity</th>
                        <th>Promotion Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        promotionArr.map((p) => (
                            <tr key={p.promotionId}>
                                <td>{p.promotionId}</td>
                                <td>{p.name}</td>
                                <td>{p.rules}</td>
                                <td>{p.validity}</td>
                                <td>{p.promotionType ? p.promotionType.name : "N/A"}</td>
                                <td>
                                    <Link to={`/Promotion/editPromotion/${p.promotionId}`}>Edit</Link>
                                    &nbsp;&nbsp;
                                    <Link to={`/Promotion/deletePromotion/${p.promotionId}`}>Delete</Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <div>
                <button onClick={() => setPgno(pgno - 1)} disabled={pgno === 0}>Previous</button>
                &nbsp;
                <span>Page {pgno + 1} of {totalPages}</span>
                &nbsp;
                <button onClick={() => setPgno(pgno + 1)} disabled={pgno + 1 >= totalPages}>Next</button>
=======
            .catch((err) => {
                setError("Error: " + err.message);
            });
    }, [pgno]);

    return (
        <div className="container mt-4">
            <h2 className="mb-3">All Promotions</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Rules</th>
                            <th>Validity</th>
                            <th>Promotion Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {promotionArr.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    No promotions found
                                </td>
                            </tr>
                        ) : (
                            promotionArr.map((p) => (
                                <tr key={p.promotionId}>
                                    <td>{p.promotionId}</td>
                                    <td>{p.name}</td>
                                    <td>{p.rules}</td>
                                    <td>{p.validity}</td>
                                    <td>{p.promotionType ? p.promotionType.name : "N/A"}</td>
                                    <td>
                                        <Link to={`/Promotion/editPromotion/${p.promotionId}`}
                                            className="btn btn-warning btn-sm me-2">Edit</Link>
                                        <Link to={`/Promotion/deletePromotion/${p.promotionId}`}
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
>>>>>>> Rakesh
            </div>
        </div>
    );
}