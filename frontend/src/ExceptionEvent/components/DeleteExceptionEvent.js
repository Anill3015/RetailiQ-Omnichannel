import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DeleteExceptionEvent() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [status, setStatus] = useState("");

    useEffect(() => {

        let confirmDelete = window.confirm("Are you sure you want to delete this record?");
        const token = localStorage.getItem("token");
        if (confirmDelete) {

            axios.delete(`http://localhost:9011/api/deleteExceptionEvent/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
                .then(() => {
                    setStatus("✅ Deleted successfully");

                    // ✅ redirect after 1 second
                    setTimeout(() => {
                        navigate("/ExceptionEvent/findAllExceptionEvent");
                    }, 1000);
                })
                .catch((error) => {
                    console.error(error);
                    setStatus("❌ Delete failed");
                });

        } else {
            // ✅ if user cancels → go back
            navigate("/ExceptionEvent/findAllExceptionEvent");
        }

    }, [id, navigate]);

    return (
        <div>
            <h2>Delete Exception Event</h2>
            <p>{status}</p>
        </div>
    );
}