import StatsCard from "../Components/Atoms/StatsCard";
import { BsFillPeopleFill, BsFillExclamationCircleFill, BsBag } from "react-icons/bs";

export default function Home() {
    const items = [
        { title: "Projects", value: "1", icon: <BsBag />, iconBg: "bg-blue-500", clickable: true, percentage: 0 },
        { title: "Errors", value: "1", icon: <BsFillExclamationCircleFill />, iconBg: "bg-red-500", clickable: true, percentage: '-10' },
        { title: "Users", value: "1", icon: <BsFillPeopleFill />, iconBg: "bg-green-500", clickable: true, percentage: '+50' },
    ];

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
                <StatsCard key={index} {...item} />
            ))}
        </div>
    );
};