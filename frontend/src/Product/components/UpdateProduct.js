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
        axios.get(`http://localhost:9011/product/find/${id}`)
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

        axios.post("http://localhost:9011/product/add", data)
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
        <div>
            <h2>Update Product</h2>
            <form onSubmit={updateProduct}>
                <label>SKU</label>
                <input
                    placeholder="enter SKU"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                /><br />

                <label>Name</label>
                <input
                    placeholder="enter product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                /><br />

                <label>Category</label>
                <input
                    placeholder="enter category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                /><br />

                <button type="submit">Update Product</button>
                &nbsp;
                <button type="button" onClick={() => navigate("/Product/findProduct")}>Cancel</button>
            </form>
        </div>
    );
}