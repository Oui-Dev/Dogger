export default function Tbody({ ...props }) {
    const actionHover = (action) => {
        return action.hover ?? 'hover:text-dogger-orange-400';
    }

    return (
        <tbody className="divide-y divide-gray-200 bg-white block overflow-auto" style={{maxHeight: '70vh'}}>
            { props.data.map((item, index) => (
                <tr key={index} className="table table-fixed w-full">
                    { props.tableKeys.map((key, index) => (
                        <td className="custom_td" key={index}>
                            {props.formatedData(item, key)}
                        </td>
                    ))}
                    { props.hasActions &&
                        <td className="custom_actions">
                            {props.actions.map((action, index) => (
                                <div className="action_btn" key={index}>
                                    <button onClick={() => action.function(item[action.fctParam])} className={actionHover(action)}>
                                        {action.icon}
                                    </button>
                                </div>
                            ))}
                        </td>
                    }
                </tr>
            ))}
        </tbody>
    );
}
