import axios from 'axios';
import { useState, useEffect } from 'react';

export default function FindPromotionType() {
    const [typeArr, setTypeArr] = useState([]);
    const [pgno, setPgno] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState("");

    const size = 10;
    const sorting = "promotionTypeId";
    const asc = true;

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`http://localhost:9011/promotionType/fetchAllPaginated?pgno=${pgno}&size=${size}&sorting=${sorting}&asc=${asc}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setTypeArr(res.data.content);
                setTotalPages(res.data.totalPages);
            })
            .catch((err) => {
                setError("Error: " + err.message);
            });
    }, [pgno]);

    return (
        <div className="container mt-4">
            <h2 className="mb-3">All Promotion Types</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {typeArr.length === 0 ? (
                            <tr>
                                <td colSpan="2" className="text-center">
                                    No promotion types found
                                </td>
                            </tr>
                        ) : (
                            typeArr.map((t) => (
                                <tr key={t.promotionTypeId}>
                                    <td>{t.promotionTypeId}</td>
                                    <td>{t.name}</td>
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