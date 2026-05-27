import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdatePriceList() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [currency, setCurrency] = useState("");
    const [price, setPrice] = useState("");
    const [effectiveFrom, setEffectiveFrom] = useState("");
    const [effectiveTo, setEffectiveTo] = useState("");
    const [productId, setProductId] = useState("");
    const [products, setProducts] = useState([]);

    // Load products for dropdown
    useEffect(() => {
        axios.get("http://localhost:9011/product/fetchAllPaginated?pgno=0&size=100&sorting=productId&asc=true")
            .then((res) => setProducts(res.data.content))
            .catch((err) => alert("Error loading products: " + err.message));
    }, []);

    // Load existing pricelist data
    useEffect(() => {
        axios.get(`http://localhost:9011/pricelist/find/${id}`)
            .then((res) => {
                setCurrency(res.data.currency);
                setPrice(res.data.price);
                setEffectiveFrom(res.data.effectiveFrom ? res.data.effectiveFrom.slice(0, 16) : "");
                setEffectiveTo(res.data.effectiveTo ? res.data.effectiveTo.slice(0, 16) : "");
                setProductId(res.data.product ? String(res.data.product.productId) : "");
            })
            .catch((err) => {
                alert("Error loading pricelist: " + err.message);
                navigate("/PriceList/findPriceList");
            });
    }, [id]);

    let updatePriceList = (event) => {
        event.preventDefault();

        let data = {
            "priceListId": Number(id),
            "currency": currency,
            "price": Number(price),
            "effectiveFrom": effectiveFrom + ":00",
            "effectiveTo": effectiveTo + ":00",
            "product": {
                "productId": Number(productId)
            }
        }

        axios.put("http://localhost:9011/pricelist/update", data)
            .then((res) => {
                alert("PriceList updated successfully!");
                navigate("/PriceList/findPriceList");
            })
            .catch((err) => {
                if (err.response) {
                    alert("Error: " + err.response.status + " - " + JSON.stringify(err.response.data));
                } else {
                    alert("Network error: " + err.message);
                }
            });
    }

    return (
        <div>
            <h2>Update PriceList</h2>
            <form onSubmit={updatePriceList}>
                <label>Currency</label>
                <input
                    placeholder="e.g. USD, INR"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                /><br />

                <label>Price</label>
                <input
                    type="number"
                    placeholder="enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                /><br />

                <label>Effective From</label>
                <input
                    type="datetime-local"
                    value={effectiveFrom}
                    onChange={(e) => setEffectiveFrom(e.target.value)}
                /><br />

                <label>Effective To</label>
                <input
                    type="datetime-local"
                    value={effectiveTo}
                    onChange={(e) => setEffectiveTo(e.target.value)}
                /><br />

                <label>Product</label>
                <select value={productId} onChange={(e) => setProductId(e.target.value)}>
                    <option value="">Select Product</option>
                    {products.map((p) => (
                        <option key={p.productId} value={p.productId}>
                            {p.name} ({p.sku})
                        </option>
                    ))}
                </select><br />

                <button type="submit">Update PriceList</button>
                &nbsp;
                <button type="button" onClick={() => navigate("/PriceList/findPriceList")}>Cancel</button>
            </form>
        </div>
    );
}