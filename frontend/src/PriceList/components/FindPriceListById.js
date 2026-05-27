import axios from 'axios';
import { useState } from 'react';

export default function FindPriceListById() {
    const [id, setId] = useState("");
    const [priceList, setPriceList] = useState(null);
    const [error, setError] = useState("");

    let searchPriceList = (event) => {
        event.preventDefault();
        setError("");
        setPriceList(null);

        if (!id) {
            setError("Please enter a PriceList ID");
            return;
        }

        axios.get(`http://localhost:9011/pricelist/find/${id}`)
            .then((res) => {
                setPriceList(res.data);
            })
            .catch((err) => {
                if (err.response && err.response.status === 404) {
                    setError("PriceList not found with ID: " + id);
                } else {
                    setError("Network error: " + err.message);
                }
            });
    }

    return (
        <div>
            <h2>Find PriceList By ID</h2>
            <form onSubmit={searchPriceList}>
                <label>Enter PriceList ID</label>
                <input
                    type="number"
                    placeholder="enter pricelist id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                &nbsp;
                <button type="submit">Search</button>
            </form>

            <br />

            {error && <p style={{ color: "red" }}>{error}</p>}

            {priceList && (
                <table border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Currency</th>
                            <th>Price</th>
                            <th>Effective From</th>
                            <th>Effective To</th>
                            <th>Product</th>
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