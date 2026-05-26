import axios from 'axios';
import { useState } from 'react';

export default function CreateProduct() {
    const [sku, setSku] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");

    let saveProduct = (event) => {
        event.preventDefault();

        if (!sku || !name || !category) {
            alert("Please fill all fields");
            return;
        }

        let data = {
            "sku": sku,
            "name": name,
            "category": category
        }

        axios.post("http://localhost:9011/product/add", data)
            .then((res) => {
                alert("Product created successfully!");
                setSku("");
                setName("");
                setCategory("");
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
            <h2>Create Product</h2>
            <form onSubmit={saveProduct}>
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

                <button type="submit">Add Product</button>
            </form>
        </div>
    );
}