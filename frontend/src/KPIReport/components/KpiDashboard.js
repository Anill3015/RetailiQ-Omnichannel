import axios from "axios";
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
 
export default function KpiDashboard() {
 
    const [data, setData] = useState({});
    const [errorMsg, setErrorMsg] = useState("");
    const token = localStorage.getItem("token");
 
    useEffect(() => {
        axios.get("http://localhost:9011/api/kpi/summary", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            setData(res.data);
            setErrorMsg("");
        })
        .catch(() => setErrorMsg("Failed to load KPI"));
    }, []);
 
    const Card = ({ title, value, color }) => (
        <div className="col-md-3 mb-3">
            <div className={`card text-white bg-${color}`}>
                <div className="card-body text-center">
                    <h6>{title}</h6>
                    <h2>{value || 0}</h2>
                </div>
            </div>
        </div>
    );
 
    const returnChartData = {
        labels: ["Approved", "Rejected", "Completed"],
        datasets: [
            {
                label: "Returns",
                data: [
                    data.approvedReturns || 0,
                    data.rejectedReturns || 0,
                    data.completedReturns || 0
                ],
                backgroundColor: ["#0d6efd", "#dc3545", "#198754"]
            }
        ]
    };
 
    const inventoryChartData = {
        labels: ["Normal", "Low Stock", "Stockouts"],
        datasets: [
            {
                data: [
                    data.normalStock || 0,
                    data.lowStock || 0,
                    data.stockouts || 0
                ],
                backgroundColor: ["#198754", "#ffc107", "#dc3545"]
            }
        ]
    };
 
    const noInventoryData =
        (data.normalStock || 0) === 0 &&
        (data.lowStock || 0) === 0 &&
        (data.stockouts || 0) === 0;
 
    return (
        <div className="container">
 
            <h2 className="mb-4">KPI Dashboard</h2>
 
            {errorMsg && (
                <div className="alert alert-danger">{errorMsg}</div>
            )}
 
            <div className="row">
 
                <Card title="Total Orders" value={data.totalOrders} color="primary" />
                <Card title="Total Returns" value={data.totalReturns} color="warning" />
                <Card title="Completed Returns" value={data.completedReturns} color="success" />
                <Card title="Rejected Returns" value={data.rejectedReturns} color="danger" />
 
                <Card title="Total Exceptions" value={data.totalExceptions} color="secondary" />
                <Card title="Open Exceptions" value={data.openExceptions} color="dark" />
 
                <Card title="Stockouts" value={data.stockouts} color="danger" />
                <Card title="Low Stock" value={data.lowStock} color="warning" />
 
            </div>
 
            <div className="row mt-5">
 
                <div className="col-md-6">
                    <h5>Return Status</h5>
                    <Bar data={returnChartData} />
                </div>
 
                <div className="col-md-6 text-center">
                    <h5>Inventory Health</h5>
 
                    {noInventoryData ? (
                        <p>No inventory data available</p>
                    ) : (
                        <div style={{ width: "250px", margin: "auto" }}>
                            <Pie data={inventoryChartData} />
                        </div>
                    )}
 
                </div>
 
            </div>
 
        </div>
    );
}
 