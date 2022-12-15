import Li from '../../Atoms/Table/Li';
import Thead from '../../Atoms/Table/Thead';
import Tbody from '../../Atoms/Table/Tbody';
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
    const emitAction = (action, item) => {
        props[action.emitName](item[action.returnValue]);
    }

    return (
        <section>
            {/* Table (smallest breakpoint only) */}
            <div className="shadow rounded-lg md:hidden">
                <ul className="mt-4 divide-y divide-gray-200 overflow-hidden shadow rounded-lg md:hidden">
                    { hasData() &&
                        <Li {...props} hasActions={hasActions} emitAction={emitAction} />
                    }
                    {!hasData() && 
                        <li className="text-center py-3">
                            Aucunes données
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
                                <Tbody {...props} hasActions={hasActions} emitAction={emitAction} />
                            </table>
                        </div>
                    }
                    { !hasData() && <div>No values to display.</div> }
                </div>
            </div>
        </section>
    );
}
