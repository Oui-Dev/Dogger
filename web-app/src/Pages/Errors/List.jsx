import { Link } from "react-router-dom";
import Table from '../../Components/Molecules/Table/Table';
import { BsPencilSquare, BsTrash, BsReceipt } from 'react-icons/bs';

export default function ErrorsList() {
    const data = [
        {project: 'test', date: '12/12/2022', code: 500, status: 'viewed'},
        {project: 'test', date: '12/12/2022', code: 500, status: 'viewed'},
        {project: 'test', date: '12/12/2022', code: 500, status: 'viewed'},
    ];
    
    const projects = [...new Set(data.map(item => item.project))];

    return (
        <>
        <div className="flex justify-between mb-4">
            <select name="" id="">
                <option value="All">All</option>
                {projects.map((item, index) => (
                    <option value={item} key={index}>{item}</option>
                ))}
            </select>
            <Link to="/projects/add" className="bg-dogger-orange-400 hover:bg-dogger-orange-500 text-white font-semibold py-2 px-4 rounded-md">Add project</Link>
        </div>
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
    </>
    );
};