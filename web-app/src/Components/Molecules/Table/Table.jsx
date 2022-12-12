import { useEffect } from 'react';
import { Link } from "react-router-dom";
import './Table.scss';

export default function Table({ ...props }) {
    useEffect(() => {
        if (props.tableTitles.length !== props.tableKeys.length) {
            throw new Error(
                "The number of table titles and table keys must be the same."
            );
        }
    }, []);

    const hasData = () => {
        return props.data.length > 0;
    }
    const hasActions = () => {
        return props.actions.length > 0;
    }
    const actionHover = (action) => {
        return action.hover ?? 'hover:text-red-500';
    }

    return (
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                { hasData() &&
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-dogger-orange-400 text-white">
                                <tr>
                                    { props.tableTitles.map((title, index) => (
                                        <th scope="col" className="custom_th" key={index}>
                                            {title}
                                        </th>
                                    ))}
                                    { hasActions() &&
                                        <th
                                            scope="col"
                                            className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            Actions
                                        </th>
                                    }
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                { props.data.map((item, index) => (
                                    <tr key={index}>
                                        { props.tableKeys.map((key, index) => (
                                            <td className="custom_td" key={index}>
                                                {item[key]}
                                            </td>
                                        ))}
                                        { hasActions() &&
                                            <td className="custom_actions">
                                                {props.actions.map(action => (
                                                    <div className="action_btn" key={action.name}>
                                                        <Link to={action.link} className={actionHover(action)}>
                                                            {action.icon}
                                                        </Link>
                                                    </div>
                                                ))}
                                            </td>
                                        }
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
                { !hasData() && <div>No values to display.</div> }
            </div>
        </div>
    );
}
