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
        return action.hover ?? 'hover:text-dogger-orange-400';
    }

    return (
        <section>
            {/* Table (smallest breakpoint only) */}
            <div className="shadow rounded-lg md:hidden">
                <ul role="list" className="mt-4 divide-y divide-gray-200 overflow-hidden shadow rounded-lg md:hidden">
                    {props.data.map((item, index) => (
                        <li key={index} className="flex items-center bg-white px-4 py-4 hover:bg-gray-50">
                            <div className="flex gap-4 justify-between items-center w-full divide-x divide-gray-200">
                                <div className="grid gap-3 text-sm text-gray-500">
                                    { props.tableKeys.map((key, index) => (
                                        <span key={index}><span className="font-medium text-gray-900 capitalize">{key} : </span>{item[key]}</span>
                                    ))}
                                </div>
                                <div className="grid gap-4 text-xl pl-4">
                                    { props.actions.map((action, index) => (
                                        <Link to={action.link} key={index} className="p-1">{action.icon}</Link>
                                    ))}
                                </div>
                            </div>
                        </li>
                    ))}
                    {!hasActions() && 
                        <li className="text-center py-3">
                            Aucunes données
                        </li>
                    }
                </ul>
            </div>

            {/* Table (medium breakpoint and up) */}
            <div className="hidden md:block">
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
            </div>
        </section>
    );
}
