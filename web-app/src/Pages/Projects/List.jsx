import { Link } from "react-router-dom";
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import Table from '../../Components/Molecules/Table/Table';

export default function ProjectsList() {
    const data = [
        {name: 'test1', created_at: 'test1'},
        {name: 'test2', created_at: 'test2'},
        {name: 'test3', created_at: 'test3'}
    ];

    return (
        <>
            <div className="flex justify-end mb-4">
                <Link to="/projects/add" className="bg-dogger-orange-400 hover:bg-dogger-orange-500 text-white font-bold py-2 px-4 rounded-md">Add project</Link>
            </div>
            <Table
                tableTitles={['Project', 'Created at']}
                tableKeys={['name', 'created_at']}
                data={data}
                actions={[
                    { name: 'Edit', link: '/projects/edit', icon: <BsPencilSquare /> },
                    { name: 'Delete', link: '/projects/delete', icon: <BsTrash />, hover: 'hover:text-red-500' }
                ]}
            />
        </>
    );
};