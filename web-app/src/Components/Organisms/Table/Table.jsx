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
    const formatedDate = (date) => {
        if(new Date(date).getTime() > 0) {
            date = !isNaN(Date.parse(date + " GMT")) ? new Date(date + " GMT") : new Date(date);
            return date.toLocaleDateString() + " " + date.toLocaleTimeString();
        }
        return date;
    };

    return (
        <section>
            {/* Table (smallest breakpoint only) */}
            <div className="shadow rounded-lg md:hidden">
                <ul className="mt-4 divide-y divide-gray-200 shadow rounded-lg md:hidden overflow-auto" style={{ maxHeight: '595px' }}>
                    { hasData() &&
                        <Li {...props} hasActions={hasActions} formatedDate={formatedDate} />
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
                                <Tbody {...props} hasActions={hasActions} formatedDate={formatedDate} />
                            </table>
                        </div>
                    }
                    { !hasData() && <div className="text-center">No values to display</div> }
                </div>
            </div>
        </section>
    );
}
