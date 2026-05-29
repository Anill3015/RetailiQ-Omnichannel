import axios from 'axios';
import { useState } from 'react';

export default function FindProductById() {
    const [id, setId] = useState("");
    const [product, setProduct] = useState(null);
    const [error, setError] = useState("");

    let search = (event) => {
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
    console.error(err);
    setProduct(null);
 
    if (err.response) {
        const data = err.response.data;
 
        if (data && data.error) {
            setError(data.error); // ✅ correct message
        } else if (err.response.status === 404) {
            setError("Record not found ❌");
        } else if (err.response.status === 400) {
            setError("Bad request ❌");
        } else {
            setError("Something went wrong ❌");
        }
    } else {
        setError("Server not reachable ❌");
    }
});
    }

    return (
        <div className="container mt-4">
            <h2>Find Product By ID</h2>

            <form onSubmit={search} className="d-flex gap-2 mb-3">
                <input
                    type="number"
                    className="form-control w-25"
                    placeholder="enter product id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">Search</button>
            </form>

            {error && <div className="alert alert-danger">{error}</div>}

            {product && (
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
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