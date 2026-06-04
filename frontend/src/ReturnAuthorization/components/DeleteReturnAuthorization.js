import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DeleteReturnAuthorization() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [status, setStatus] = useState("");

    useEffect(() => {

        const confirmDelete = window.confirm("Are you sure you want to delete this Return Authorization?");
<<<<<<< HEAD

        if (confirmDelete) {

            axios.delete(`http://localhost:9011/api/deleteReturnAuthorization/${id}`)
=======
        const token = localStorage.getItem("token");

        if (confirmDelete) {

            axios.delete(`http://localhost:9011/api/deleteReturnAuthorization/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
>>>>>>> Rakesh
                .then(() => {
                    setStatus("✅ Return Authorization deleted successfully");

                    // ✅ redirect back to list
                    setTimeout(() => {
                        navigate("/ReturnAuthorization/findAllReturnAuthorization");
                    }, 1000);
                })
                .catch((error) => {
                    console.error("Delete error:", error);
                    setStatus("❌ Delete failed");
                });

        } else {
            // ✅ user cancels → go back
            navigate("/ReturnAuthorization/findAllReturnAuthorization");
        }

    }, [id, navigate]);

    return (
        <div>
            <h2>Delete Return Authorization</h2>
            <p>{status}</p>
        </div>
    );
}
