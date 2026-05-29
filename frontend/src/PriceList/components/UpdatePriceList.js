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

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get("http://localhost:9011/product/fetchAllPaginated?pgno=0&size=100&sorting=productId&asc=true",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
            .then((res) => setProducts(res.data.content))
            .catch((err) => alert("Error loading products: " + err.message));
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`http://localhost:9011/pricelist/find/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
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

    let update = (event) => {
        event.preventDefault();
        let data = {
            "priceListId": Number(id),
            "currency": currency,
            "price": Number(price),
            "effectiveFrom": effectiveFrom + ":00",
            "effectiveTo": effectiveTo + ":00",
            "product": { "productId": Number(productId) }
        }

        axios.put("http://localhost:9011/pricelist/update", data)
            .then(() => {
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
        <div className="container mt-4">
            <h2>Update PriceList</h2>
            <form onSubmit={update}>
                <div className="mb-3">
                    <label className="form-label">Currency</label>
                    <input className="form-control" placeholder="e.g. USD, INR"
                        value={currency} onChange={(e) => setCurrency(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input type="number" className="form-control" placeholder="enter price"
                        value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Effective From</label>
                    <input type="datetime-local" className="form-control"
                        value={effectiveFrom} onChange={(e) => setEffectiveFrom(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Effective To</label>
                    <input type="datetime-local" className="form-control"
                        value={effectiveTo} onChange={(e) => setEffectiveTo(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Product</label>
                    <select className="form-select" value={productId}
                        onChange={(e) => setProductId(e.target.value)}>
                        <option value="">Select Product</option>
                        {products.map((p) => (
                            <option key={p.productId} value={p.productId}>
                                {p.name} ({p.sku})
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary me-2">Update PriceList</button>
                <button type="button" className="btn btn-secondary"
                    onClick={() => navigate("/PriceList/findPriceList")}>Cancel</button>
            </form>
        </div>
    );
}