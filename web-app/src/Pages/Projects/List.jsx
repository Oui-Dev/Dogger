import Table from '../../Components/Molecules/Table/Table';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';

export default function ProjectsList() {
    const data = [
        {name: 'test1', created_at: 'test1'},
        {name: 'test2', created_at: 'test2'},
        {name: 'test3', created_at: 'test3'}
    ];

    return (
        <Table
            tableTitles={['Project', 'Created at']}
            tableKeys={['name', 'created_at']}
            data={data}
            actions={[
                { name: 'Edit', link: '/projects/edit', icon: <BsPencilSquare /> },
                { name: 'Delete', link: '/projects/delete', icon: <BsTrash />, hover: 'hover:text-red-500' }
            ]}
        />
    );
};