import axios from 'axios';
import { useState, useEffect } from 'react';

export default function CreatePriceList() {
    const [currency, setCurrency] = useState("");
    const [price, setPrice] = useState("");
    const [effectiveFrom, setEffectiveFrom] = useState("");
    const [effectiveTo, setEffectiveTo] = useState("");
    const [productId, setProductId] = useState("");
    const [products, setProducts] = useState([]);

<<<<<<< HEAD
    // Load products for dropdown
    useEffect(() => {
        axios.get("http://localhost:9011/product/fetchAllPaginated?pgno=0&size=100&sorting=productId&asc=true")
            .then((res) => {
                setProducts(res.data.content);
            })
            .catch((err) => alert("Error loading products: " + err.message));
    }, []);

    let savePriceList = (event) => {
        event.preventDefault();

        if (!currency || !price || !effectiveFrom || !effectiveTo || !productId) {
            alert("Please fill all fields");
            return;
=======
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get("http://localhost:9011/product/fetchAllPaginated?pgno=0&size=100&sorting=productId&asc=true")
            .then((res) => setProducts(res.data.content))
            .catch((err) => alert("Error loading products: " + err.message));
    }, []);

    let save = (event) => {
        event.preventDefault();
        if (!currency || !price || !effectiveFrom || !effectiveTo || !productId) {
            alert("Please fill all fields"); return;
>>>>>>> Rakesh
        }

        let data = {
            "currency": currency,
            "price": Number(price),
            "effectiveFrom": effectiveFrom + ":00",
            "effectiveTo": effectiveTo + ":00",
<<<<<<< HEAD
            "product": {
                "productId": Number(productId)
            }
        }

        axios.post("http://localhost:9011/pricelist/add", data)
            .then((res) => {
                alert("PriceList created successfully!");
                setCurrency("");
                setPrice("");
                setEffectiveFrom("");
                setEffectiveTo("");
                setProductId("");
=======
            "product": { "productId": Number(productId) }
        }
        const token = localStorage.getItem("token");
        axios.post("http://localhost:9011/pricelist/add", data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
            .then(() => {
                alert("PriceList created successfully!");
                setCurrency(""); setPrice(""); setEffectiveFrom("");
                setEffectiveTo(""); setProductId("");
>>>>>>> Rakesh
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
<<<<<<< HEAD
        <div>
            <h2>Create PriceList</h2>
            <form onSubmit={savePriceList}>
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

                <button type="submit">Add PriceList</button>
=======
        <div className="container mt-4">
            <h2>Create PriceList</h2>
            <form onSubmit={save}>
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
                <button type="submit" className="btn btn-primary">Add PriceList</button>
>>>>>>> Rakesh
            </form>
        </div>
    );
}