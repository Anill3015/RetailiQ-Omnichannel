import axios from "axios";
import { useEffect, useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import "chart.js/auto";

export default function KpiDashboard() {

    const [data, setData] = useState({});
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get("http://localhost:9011/api/kpi/summary", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => setData(res.data))
        .catch(() => alert("Failed to load KPI"));
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
        labels: ["Stockouts", "Low Stock"],
        datasets: [
            {
                data: [
                    data.stockouts || 0,
                    data.lowStock || 0
                ],
                backgroundColor: ["red", "orange"]
            }
        ]
    };

    const trendData = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        datasets: [
            {
                label: "Orders",
                data: [
                    data.totalOrders || 0,
                    data.totalOrders + 1 || 0,
                    data.totalOrders + 2 || 0,
                    data.totalOrders + 3 || 0,
                    data.totalOrders + 4 || 0
                ],
                borderColor: "blue",
                fill: false
            },
            {
                label: "Returns",
                data: [
                    data.totalReturns || 0,
                    data.totalReturns + 1 || 0,
                    data.totalReturns + 2 || 0,
                    data.totalReturns + 3 || 0,
                    data.totalReturns + 4 || 0
                ],
                borderColor: "green",
                fill: false
            }
        ]
    };

    return (
        <div className="container">

            <h2 className="mb-4">KPI Dashboard</h2>

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
                    <h5>Inventory Alerts</h5>
                    <div style={{ width: "250px", margin: "auto" }}>
                        <Pie data={inventoryChartData} />
                    </div>
                </div>

            </div>

            <div className="row mt-5">
                <div className="col-md-12">
                    <h5>Weekly Trends</h5>
                    <div style={{ height: "300px", marginBottom: "50px" }}>
                        <Line data={trendData} />
                    </div>
                    
                </div>
            </div>

        </div>
    );
}