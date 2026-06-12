import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DeleteReturnAuthorization() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [status, setStatus] = useState("");

    useEffect(() => {

        const confirmDelete = window.confirm("Are you sure you want to delete this Return Authorization?");
        const token = localStorage.getItem("token");

        if (confirmDelete) {

            axios.delete(`http://localhost:9011/api/deleteReturnAuthorization/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(() => {
                setStatus("Return Authorization deleted successfully");

                setTimeout(() => {
                    navigate("/ReturnAuthorization/findAllReturnAuthorization");
                }, 1000);
            })
            .catch((err) => {

                if (err.response && err.response.data) {

                    if (typeof err.response.data === "string") {
                        setStatus(err.response.data);
                    } else if (err.response.data.error) {
                        setStatus(err.response.data.error);
                    } else if (err.response.data.message) {
                        setStatus(err.response.data.message);
                    } else {
                        setStatus("Delete failed");
                    }

                } else {
                    setStatus("Server not reachable");
                }
            });

        } else {
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
