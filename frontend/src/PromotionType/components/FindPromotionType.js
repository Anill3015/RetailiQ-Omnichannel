import axios from 'axios';
import { useState, useEffect } from 'react';

export default function FindPromotionType() {
    const [typeArr, setTypeArr] = useState([]);
    const [pgno, setPgno] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const size = 10;
    const sorting = "promotionTypeId";
    const asc = true;

    useEffect(() => {
        axios.get(`http://localhost:9011/promotionType/fetchAllPaginated?pgno=${pgno}&size=${size}&sorting=${sorting}&asc=${asc}`)
            .then((res) => {
                setTypeArr(res.data.content);
                setTotalPages(res.data.totalPages);
            })
            .catch((err) => alert(err.message));
    }, [pgno]);

    return (
        <div>
            <h2>All Promotion Types</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        typeArr.map((t) => (
                            <tr key={t.promotionTypeId}>
                                <td>{t.promotionTypeId}</td>
                                <td>{t.name}</td>
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