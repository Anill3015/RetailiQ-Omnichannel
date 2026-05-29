import axios from 'axios';
import { useState } from 'react';

export default function FindPriceListById() {
    const [id, setId] = useState("");
    const [priceList, setPriceList] = useState(null);
    const [error, setError] = useState("");

    let search = (event) => {
        event.preventDefault();
        setError(""); setPriceList(null);
        if (!id) { setError("Please enter a PriceList ID"); return; }
        const token = localStorage.getItem("token");
        axios.get(`http://localhost:9011/pricelist/find/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
            .then((res) => setPriceList(res.data))
            .catch((err) => {
                if (err.response && err.response.status === 404) {
                    setError("PriceList not found with ID: " + id);
                } else {
                    setError("Network error: " + err.message);
                }
            });
    }

    return (
        <div className="container mt-4">
            <h2>Find PriceList By ID</h2>
            <form onSubmit={search} className="d-flex gap-2 mb-3">
                <input type="number" className="form-control w-25"
                    placeholder="enter pricelist id" value={id}
                    onChange={(e) => setId(e.target.value)} />
                <button type="submit" className="btn btn-primary">Search</button>
            </form>

            {error && <div className="alert alert-danger">{error}</div>}

            {priceList && (
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th><th>Currency</th><th>Price</th>
                            <th>Effective From</th><th>Effective To</th><th>Product</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{priceList.priceListId}</td>
                            <td>{priceList.currency}</td>
                            <td>{priceList.price}</td>
                            <td>{new Date(priceList.effectiveFrom).toLocaleString()}</td>
                            <td>{new Date(priceList.effectiveTo).toLocaleString()}</td>
                            <td>{priceList.product ? priceList.product.name : "N/A"}</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}