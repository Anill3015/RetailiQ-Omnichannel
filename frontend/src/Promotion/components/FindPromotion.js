import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function FindPromotion() {
    const [promotionArr, setPromotionArr] = useState([]);
    const [pgno, setPgno] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const size = 10;
    const sorting = "promotionId";
    const asc = true;

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`http://localhost:9011/promotion/fetchAllPaginated?pgno=${pgno}&size=${size}&sorting=${sorting}&asc=${asc}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }})
            .then((res) => {
                setPromotionArr(res.data.content);
                setTotalPages(res.data.totalPages);
            })
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
            </div>
        </div>
    );
}