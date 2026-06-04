import axios from 'axios';
import { useState } from 'react';

export default function CreateProduct() {
    const [sku, setSku] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");

<<<<<<< HEAD
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
=======
    let save = (event) => {
        event.preventDefault();
        if (!sku || !name || !category) { alert("Please fill all fields"); return; }
        let token = localStorage.getItem("token");
        axios.post("http://localhost:9011/product/add", 
            { "sku": sku, "name": name, "category": category },{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
            .then(() => {
                alert("Product created successfully!");
                setSku(""); setName(""); setCategory("");
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
=======
        <div className="container mt-4">
            <h2>Create Product</h2>
            <form onSubmit={save}>
                <div className="mb-3">
                    <label className="form-label">SKU</label>
                    <input className="form-control" placeholder="enter SKU"
                        value={sku} onChange={(e) => setSku(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input className="form-control" placeholder="enter product name"
                        value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <input className="form-control" placeholder="enter category"
                        value={category} onChange={(e) => setCategory(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Add Product</button>
>>>>>>> Rakesh
            </form>
        </div>
    );
}