import Table from '../../Components/Molecules/Table/Table';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';

export default function ProjectsList() {
    return (
        <Table
            tableTitles={['Project', 'Created at']}
            tableKeys={['name', 'created_at']}
            data={[
                {name: 'test', created_at: 'test'}
            ]}
            actions={[
                { name: 'Edit', link: '/projects/edit', icon: <BsPencilSquare />, hover: 'hover:text-dogger-orange-400' },
                { name: 'Delete', link: '/projects/delete', icon: <BsTrash /> }
            ]}
        />
    );
};