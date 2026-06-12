import axios from 'axios';
import { useState, useEffect } from 'react';

export default function FindAuditLog() {
    const [logs, setLogs] = useState([]);
    const [pgno, setPgno] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState("");

    const size = 10;
    const sorting = "auditId";
    const asc = false;

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`http://localhost:9011/auditlog/fetchAllPaginated?pgno=${pgno}&size=${size}&sorting=${sorting}&asc=${asc}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setLogs(res.data.content);
                setTotalPages(res.data.totalPages);
            })
            .catch((err) => {
                setError("Error: " + err.message);
            });
    }, [pgno]);

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Audit Logs</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Action</th>
                            <th>Timestamp</th>
                            <th>User ID</th>
                            <th>User Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    No audit logs found
                                </td>
                            </tr>
                        ) : (
                            logs.map((log) => (
                                <tr key={log.auditId}>
                                    <td>{log.auditId}</td>
                                    <td>{log.action}</td>
                                    <td>{new Date(log.timestamp).toLocaleString()}</td>
                                    <td>{log.user ? log.user.userId : "N/A"}</td>
                                    <td>{log.user ? log.user.name : "N/A"}</td>
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