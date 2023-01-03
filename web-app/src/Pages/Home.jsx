import StatsCard from "../Components/Molecules/StatsCard";
import { BsFillExclamationTriangleFill, BsFillExclamationCircleFill, BsBag } from "react-icons/bs";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
} from 'chart.js';

export default function Home() {
    const BASE_URL = process.env.REACT_APP_API_URL;
    // in the future, we will get the token from redux
    const config = {
        headers: { Authorization: process.env.REACT_APP_TOKEN }
    };

    const [chartData, setChartData] = useState(null);
    const items = [
        { title: "Projects", value: "1", icon: <BsBag />, iconBg: "bg-blue-500", clickable: true, path: "/projects" },
        { title: "Errors", value: "1", icon: <BsFillExclamationTriangleFill />, iconBg: "bg-dogger-orange-400", clickable: true, path: "/errors" },
        { title: "Last 24h errors", value: "1", icon: <BsFillExclamationCircleFill />, iconBg: "bg-red-500", clickable: true, percentage: '+50', path: "/errors" },
    ];

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Tooltip,
    );

    useEffect(() => {
        axios.get(BASE_URL + "/errors", config).then((res) => {
            if(res.status === 200 && res.data?.errors.length > 0) {
                let errors = res.data.errors.filter(error => new Date(error.timestamp) > new Date().getTime() - 1000 * 60 * 60 * 24 * 7);
                errors.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

                const data = errors.reduce((acc, error) => {
                    const errorDate = new Date(error.timestamp);
                    const dayOfWeek = errorDate.toLocaleString('default', {day: '2-digit', month: '2-digit', year: 'numeric'});
                    acc[dayOfWeek] = acc[dayOfWeek] ? acc[dayOfWeek]+1 : 1;
                    return acc;
                }, {});

                setChartData({
                    labels: Object.keys(data),
                    datasets: [
                        {
                            label: 'Errors',
                            data: Object.values(data),
                            borderColor: '#ff8437',
                            cubicInterpolationMode: 'monotone',
                        }
                    ],
                });
            }
        });
    }, []);

    return (
        <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item, index) => (
                    <StatsCard key={index} {...item} />
                ))}
            </div>
            <div className="overflow-hidden rounded-lg bg-white shadow flex flex-col items-center p-5 mt-8">
                <h3 className="text-xl mb-3">Errors evolution</h3>
                { chartData === null && <p className="text-gray-600 font-light">No values to display</p>}
                { chartData !== null &&
                    <Line options={{ responsive: true }} data={chartData} />
                }
            </div>
        </>
    );
};