import { Link } from "react-router-dom";
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import Table from '../../Components/Molecules/Table/Table';

export default function ProjectsList() {
    const data = [
        {id: 1, name: 'test1', created_at: 'test1'},
        {id: 2, name: 'test2', created_at: 'test2'},
        {id: 3, name: 'test3', created_at: 'test3'}
    ];

    return (
        <>
            <div className="flex justify-end mb-4">
                <Link to="/projects/add" className="bg-dogger-orange-400 hover:bg-dogger-orange-500 text-white font-semibold py-2 px-4 rounded-md">Add project</Link>
            </div>
            <Table
                // Props
                tableTitles={['Project', 'Created at']}
                tableKeys={['name', 'created_at']}
                data={data}
                actions={[
                    { emitName: 'edit', returnValue: 'id', icon: <BsPencilSquare /> },
                    { emitName: 'delete', returnValue: 'id', icon: <BsTrash />, hover: 'hover:text-red-500' }
                ]}
                // Emits
                edit={(id) => console.log("edit", id)}
                delete={(id) => console.log("delete", id)}
            />
        </>
    );
};