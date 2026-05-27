import axios from 'axios';
import { useState, useEffect } from 'react';

export default function FindAuditLog() {
    const [logs, setLogs] = useState([]);
    const [pgno, setPgno] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const size = 10;
    const sorting = "auditId";
    const asc = false; // latest first

    useEffect(() => {
        axios.get(`http://localhost:9011/auditlog/fetchAllPaginated?pgno=${pgno}&size=${size}&sorting=${sorting}&asc=${asc}`)
            .then((res) => {
                setLogs(res.data.content);
                setTotalPages(res.data.totalPages);
            })
            .catch((err) => alert(err.message));
    }, [pgno]);

    return (
        <div>
            <h2>Audit Logs</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Action</th>
                        <th>Timestamp</th>
                        <th>User ID</th>
                        <th>User Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        logs.map((log) => {
                            return (
                                <tr key={log.auditId}>
                                    <td>{log.auditId}</td>
                                    <td>{log.action}</td>
                                    <td>{new Date(log.timestamp).toLocaleString()}</td>
                                    <td>{log.user ? log.user.userId : "N/A"}</td>
                                    <td>{log.user ? log.user.name : "N/A"}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>

            {/* Pagination */}
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