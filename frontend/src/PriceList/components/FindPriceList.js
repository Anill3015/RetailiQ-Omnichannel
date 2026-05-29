import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function FindPriceList() {
    const [priceListArr, setPriceListArr] = useState([]);
    const [pgno, setPgno] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const size = 10;
    const sorting = "priceListId";
    const asc = true;

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`http://localhost:9011/pricelist/fetchAllPaginated?pgno=${pgno}&size=${size}&sorting=${sorting}&asc=${asc}`,{
            headers:{
                Authorization:`Bearer ${token}`
         }})
            .then((res) => {
                setPriceListArr(res.data.content);
                setTotalPages(res.data.totalPages);
            })
            .catch((err) => alert(err.message));
    }, [pgno]);

    return (
        <div>
            <h2>All PriceLists</h2>
            <table border="1">
                <thead>
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
                    {
                        priceListArr.map((pl) => {
                            return (
                                <tr key={pl.priceListId}>
                                    <td>{pl.priceListId}</td>
                                    <td>{pl.currency}</td>
                                    <td>{pl.price}</td>
                                    <td>{new Date(pl.effectiveFrom).toLocaleString()}</td>
                                    <td>{new Date(pl.effectiveTo).toLocaleString()}</td>
                                    <td>{pl.product ? pl.product.name : "N/A"}</td>
                                    <td>
                                        <Link to={`/PriceList/editPriceList/${pl.priceListId}`}>Edit</Link>
                                        &nbsp;&nbsp;
                                        <Link to={`/PriceList/deletePriceList/${pl.priceListId}`}>Delete</Link>
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