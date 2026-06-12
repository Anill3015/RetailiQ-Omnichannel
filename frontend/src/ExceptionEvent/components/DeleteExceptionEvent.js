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

            axios.delete(`http://localhost:9011/api/deleteExceptionEvent/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(() => {
                setStatus("Deleted successfully");

                setTimeout(() => {
                    navigate("/ExceptionEvent/findAllExceptionEvent");
                }, 1000);
            })
            .catch((err) => {
                if (err.response && err.response.data) {
                    if (typeof err.response.data === "string") {
                        setStatus(err.response.data);
                    } else if (err.response.data.error) {
                        setStatus(err.response.data.error);
                    } else {
                        setStatus("Delete failed");
                    }
                } else {
                    setStatus("Server not reachable");
                }
            });

        } else {
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