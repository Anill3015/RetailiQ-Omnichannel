import { useParams } from "react-router";
import axios from "axios";
import { useEffect } from "react";

export default function DeleteFulfillmentInstruction() {
    let { eid } = useParams();
    let url = "http://localhost:9011/fulfillments/delete/" + eid;

    useEffect(() => {
        if (!eid) return;
        const deleteData = async () => {
            const token = localStorage.getItem("token"); 

            try {
                const response = await axios.delete(url, {
                    headers: {
                        Authorization: `Bearer ${token}` 
                    }
                });

                alert(response.data);
            } catch (error) {
                console.error(error);

                if (error.response && error.response.status === 403) {
                    alert("403 Forbidden: You are not authorized");
                } else {
                    alert("Error: " + error.message);
                }
            }
        };

        deleteData();
    }, [eid]);

    return (
        <div>
            <h1>DeleteFulfillmentInstruction</h1>
        </div>
    );
}