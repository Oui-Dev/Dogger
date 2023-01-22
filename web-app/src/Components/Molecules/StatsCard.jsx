import { Link } from "react-router-dom";

export default function StatsCard ({ ...props }) {
    const bgIconClass = () => {
        return `flex justify-center items-center ${props.iconBg ?? 'bg-dogger-orange-500'} p-2 rounded-full w-10 h-10 text-white text-xl`;
    }
    const isNegative = () => {
        return props.percentage < 0;
    }

    return (
        <Link to={props.path} className={`overflow-hidden rounded-lg bg-white shadow ${props.clickable ? 'hover:bg-gray-50' : 'cursor-default' }`}>
            <div className="flex items-center p-5">
                <div className="mr-5 w-0 flex-1">
                    <dl>
                        <dt className="truncate text-sm font-medium text-gray-500">{ props.title }</dt>
                        <dd>
                            <div className="text-lg font-medium text-gray-900">{ props.value }
                                { props.percentage && <span className={`ml-2 text-sm ${isNegative() ? 'text-red-500' : 'text-green-500'}`}>{ props.percentage }</span> }
                            </div>
                        </dd>
                    </dl>
                </div>
                <div className={bgIconClass()}>
                    { props.icon }
                </div>
            </div>
        </Link>
    );
}