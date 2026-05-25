import axios from 'axios';
import { useState } from 'react';

export default function FindProductById() {
    const [id, setId] = useState("");
    const [product, setProduct] = useState(null);
    const [error, setError] = useState("");

    let searchProduct = (event) => {
        event.preventDefault();
        setError("");
        setProduct(null);

        if (!id) {
            setError("Please enter a Product ID");
            return;
        }

        axios.get(`http://localhost:9011/product/find/${id}`)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => {
                if (err.response && err.response.status === 404) {
                    setError("Product not found with ID: " + id);
                } else {
                    setError("Network error: " + err.message);
                }
            });
    }

    return (
        <div>
            <h2>Find Product By ID</h2>
            <form onSubmit={searchProduct}>
                <label>Enter Product ID</label>
                <input
                    type="number"
                    placeholder="enter product id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                &nbsp;
                <button type="submit">Search</button>
            </form>

            <br />

            {error && <p style={{ color: "red" }}>{error}</p>}

            {product && (
                <table border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>SKU</th>
                            <th>Name</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{product.productId}</td>
                            <td>{product.sku}</td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}