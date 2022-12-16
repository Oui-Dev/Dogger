export default function Li({ ...props }) {
    return (
        <>
            {props.data.map((item, index) => (
                <li key={index} className="flex items-center bg-white px-4 py-4 hover:bg-gray-50">
                    <div className="flex gap-4 justify-between items-center w-full divide-x divide-gray-200">
                        <div className="grid gap-3 text-sm text-gray-500">
                            { props.tableKeys.map((key, index) => (
                                <span key={index}>
                                    <span className="font-medium text-gray-900 capitalize">{key} : </span>
                                    {props.formatedData(item, key)}
                                </span>
                            ))}
                        </div>
                        { props.hasActions &&
                            <div className="grid gap-4 text-xl pl-4">
                                { props.actions.map((action, index) => (
                                    <button onClick={() => action.function(item[action.fctParam])} key={index} className="p-1">
                                        {action.icon}
                                    </button>
                                ))}
                            </div>
                        }
                    </div>
                </li>
            ))}
        </>
    );
}