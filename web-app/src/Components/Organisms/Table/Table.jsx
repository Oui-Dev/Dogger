import Li from '../../Molecules/Table/Li';
import Thead from '../../Molecules/Table/Thead';
import Tbody from '../../Molecules/Table/Tbody';
import './Table.scss';

export default function Table({ ...props }) {
    if (props.tableTitles.length !== props.tableKeys.length) {
        throw new Error(
            "The number of table titles and table keys must be the same."
        );
    }

    const hasData = () => {
        return props.data.length > 0;
    }
    const hasActions = () => {
        return props.actions.length > 0;
    }
    const formatedData = (item, key) => {
        if(key.slice(-3) === '_at') {
            const newDate = !isNaN(Date.parse(item[key] + " GMT")) ? new Date(item[key] + " GMT") : new Date(item[key]);
            return newDate.toLocaleDateString() + " " + newDate.toLocaleTimeString();
        } else if(typeof key === 'object') {
            return item[key[0]][key[1]];
        } else if(key === 'status') {
            return item[key] === 0 ? 'New'
                : item[key] === 1 ? 'In progress'
                : 'Resolved';
        }

        return item[key];
    };

    return (
        <section>
            {/* Table (smallest breakpoint only) */}
            <div className="shadow rounded-lg md:hidden">
                <ul className="mt-4 divide-y divide-gray-200 shadow rounded-lg md:hidden overflow-auto" style={{ maxHeight: '595px' }}>
                    { hasData() &&
                        <Li {...props} hasActions={hasActions} formatedData={formatedData} />
                    }
                    {!hasData() && 
                        <li className="text-center py-3">
                            No values to display
                        </li>
                    }
                </ul>
            </div>

            {/* Table (medium breakpoint and up) */}
            <div className="hidden md:block">
                <div className="inline-block min-w-full py-2">
                    { hasData() &&
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <Thead tableTitles={props.tableTitles} hasActions={hasActions} />
                                <Tbody {...props} hasActions={hasActions} formatedData={formatedData} />
                            </table>
                        </div>
                    }
                    { !hasData() && <div className="text-center">No values to display</div> }
                </div>
            </div>
        </section>
    );
}
