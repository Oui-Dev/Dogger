import Table from '../../Components/Molecules/Table/Table';
import { BsPencilSquare, BsTrash, BsReceipt } from 'react-icons/bs';

export default function ErrorsList() {
    const data = [
        {project: 'test', date: '12/12/2022', code: 500, status: 'viewed'},
        {project: 'test', date: '12/12/2022', code: 500, status: 'viewed'},
        {project: 'test', date: '12/12/2022', code: 500, status: 'viewed'},
    ];

    return (
        <Table
            tableTitles={['Project', 'Date', 'Code', 'Status']}
            tableKeys={['project', 'date', 'code', 'status']}
            data={data}
            actions={[
                { name: 'Show', link: '/projects/details', icon: <BsReceipt /> },
                { name: 'Edit', link: '/projects/edit', icon: <BsPencilSquare /> },
                { name: 'Delete', link: '/projects/delete', icon: <BsTrash />, hover: 'hover:text-red-500' }
            ]}
        />
    );
};