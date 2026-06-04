import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DeleteKPIReport() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [status, setStatus] = useState("");

    useEffect(() => {

        const confirmDelete = window.confirm("Are you sure you want to delete this KPI report?");
<<<<<<< HEAD

        if (confirmDelete) {

            axios.delete(`http://localhost:9011/api/deleteKPIReport/${id}`)
=======
        const token = localStorage.getItem("token");

        if (confirmDelete) {

            axios.delete(`http://localhost:9011/api/deleteKPIReport/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
>>>>>>> Rakesh
                .then(() => {
                    setStatus("✅ KPI Report deleted successfully");

                    // ✅ Redirect back after delete
                    setTimeout(() => {
                        navigate("/KPIReport/findAllKPIReport");
                    }, 1000);
                })
                .catch((error) => {
                    console.error("Delete error:", error);
                    setStatus("❌ Delete failed");
                });

        } else {
            // ✅ If user cancels → go back to list
            navigate("/KPIReport/findAllKPIReport");
        }

    }, [id, navigate]);

    return (
        <div>
            <h2>Delete KPI Report</h2>
            <p>{status}</p>
        </div>
    );
}
