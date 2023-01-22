import StatsCard from "../Components/Molecules/StatsCard";
import { BsFillExclamationTriangleFill, BsFillExclamationCircleFill, BsBag } from "react-icons/bs";
import { useState, useEffect } from "react";
import { retrieveStats } from "../Redux/Actions/stats";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
} from 'chart.js';
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
    const [chartData, setChartData] = useState(null);
    const [statsCardsData, setStatsCardsData] = useState([
        { title: "Total Projects", value: null, icon: <BsBag />, iconBg: "bg-blue-500", clickable: true, percentage: null, path: "/projects" },
        { title: "Total Errors", value: null, icon: <BsFillExclamationTriangleFill />, iconBg: "bg-dogger-orange-400", clickable: true, percentage: null, path: "/errors" },
        { title: "Last 24h errors", value: null, icon: <BsFillExclamationCircleFill />, iconBg: "bg-red-500", clickable: true, percentage: null, path: "/errors" },
    ]);
    const dispatch = useDispatch();
    const stats = useSelector(state => state.stats);

    useEffect(() => {
        dispatch(retrieveStats())
    }, []);

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Tooltip,
    );

    useEffect(() => {
        if(stats.length === 0) return;
        const cardsData = stats.cards;
        const graphData = stats.graph;

        statsCardsData.forEach((item, index) => {
            if(item.title === cardsData[index].title) {
                item.value = cardsData[index].value;
                if(cardsData[index].percentage) {
                    item.percentage = cardsData[index].percentage;
                }
            }
        });
        setStatsCardsData(statsCardsData);

        setChartData({
            datasets: [
                {
                    label: 'Errors',
                    data: graphData,
                    borderColor: '#ff8437',
                    cubicInterpolationMode: 'monotone',
                }
            ],
        });
    }, [stats]);

    return (
        <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {statsCardsData.map((item, index) => (
                    <StatsCard key={index} { ...item } />
                ))}
            </div>
            <div className="overflow-hidden rounded-lg bg-white shadow flex flex-col items-center p-3 md:p-5 mt-8">
                <h3 className="text-md md:text-lg mb-3">Errors in the past 7 days</h3>
                { chartData === null && <p className="text-gray-600 font-light">No values to display</p>}
                { chartData !== null &&
                    <Line options={{
                        responsive: true,
                        scale: {
                            ticks: {
                                precision: 0
                            }
                        }
                    }} data={chartData} />
                }
            </div>
        </>
    );
};