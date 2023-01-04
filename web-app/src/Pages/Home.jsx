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
    const [statsCardsData, setStatsCardsData] = useState([
        { title: "Total Projects", value: null, icon: <BsBag />, iconBg: "bg-blue-500", clickable: true, percentage: null, path: "/projects" },
        { title: "Total Errors", value: null, icon: <BsFillExclamationTriangleFill />, iconBg: "bg-dogger-orange-400", clickable: true, percentage: null, path: "/errors" },
        { title: "Last 24h errors", value: null, icon: <BsFillExclamationCircleFill />, iconBg: "bg-red-500", clickable: true, percentage: null, path: "/errors" },
    ]);

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Tooltip,
    );

    useEffect(() => {
        axios.get(BASE_URL + "/stats", config).then((res) => {
            if(res.status === 200 && res.data.data) {
                const cardsData = res.data.data.cards;
                const graphData = res.data.data.graph;

                statsCardsData.map((item, index) => {
                    if(item.title === cardsData[index].title) {
                        item.value = cardsData[index].value;
                        if(cardsData[index].percentage) {
                            item.percentage = cardsData[index].percentage;
                        }
                    }
                });
                setStatsCardsData(statsCardsData);

                setChartData({
                    labels: Object.keys(graphData),
                    datasets: [
                        {
                            label: 'Errors',
                            data: Object.values(graphData),
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
                {statsCardsData.map((item, index) => (
                    <StatsCard key={index} { ...item } />
                ))}
            </div>
            <div className="overflow-hidden rounded-lg bg-white shadow flex flex-col items-center p-5 mt-8">
                <h3 className="text-lg md:text-xl mb-3">Errors evolution</h3>
                { chartData === null && <p className="text-gray-600 font-light">No values to display</p>}
                { chartData !== null &&
                    <Line options={{ responsive: true }} data={chartData} />
                }
            </div>
        </>
    );
};