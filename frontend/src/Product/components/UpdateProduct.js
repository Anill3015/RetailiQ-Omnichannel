import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [sku, setSku] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`http://localhost:9011/product/find/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setSku(res.data.sku);
                setName(res.data.name);
                setCategory(res.data.category);
            })
            .catch((err) => {
                alert("Error loading product: " + err.message);
                navigate("/Product/findProduct");
            });
    }, [id]);

    let updateProduct = (event) => {
        event.preventDefault();

        let data = {
            "productId": Number(id),
            "sku": sku,
            "name": name,
            "category": category
        }
        const token = localStorage.getItem("token");
        axios.post("http://localhost:9011/product/add", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                alert("Product updated successfully!");
                navigate("/Product/findProduct");
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
            <h2>Update Product</h2>
            <form onSubmit={updateProduct}>
                <div className="mb-3">
                    <label className="form-label">SKU</label>
                    <input
                        className="form-control"
                        placeholder="enter SKU"
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        className="form-control"
                        placeholder="enter product name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <input
                        className="form-control"
                        placeholder="enter category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary me-2">Update Product</button>
                <button type="button" className="btn btn-secondary"
                    onClick={() => navigate("/Product/findProduct")}>Cancel</button>
            </form>
        </div>
    );
}