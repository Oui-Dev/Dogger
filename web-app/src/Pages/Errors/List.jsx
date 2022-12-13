import { useState } from 'react';
import Table from '../../Components/Molecules/Table/Table';
import { BsPencilSquare, BsTrash, BsReceipt } from 'react-icons/bs';

export default function ErrorsList() {
    const data = [
        {id: 1, project: 'test', date: '12/12/2022', code: 500, status: 'viewed'},
        {id: 2, project: 'test', date: '12/12/2022', code: 500, status: 'viewed'},
        {id: 3, project: 'test', date: '12/12/2022', code: 500, status: 'viewed'},
        {id: 4, project: 'test2', date: '12/12/2022', code: 500, status: 'viewed'},
        {id: 5, project: 'test2', date: '12/12/2022', code: 500, status: 'viewed'},
    ];

    const projects = [...new Set(data.map(item => item.project))];
    const [selectedProject, setSelectedProject] = useState('All');
    const filteredData = data.filter(item => item.project === selectedProject || selectedProject === 'All');

    return (
        <>
            <div className="flex justify-between mb-4 gap-4">
                <select onChange={(e) => setSelectedProject(e.target.value)} className="capitalize">
                    <option value="All">All</option>
                    {projects.map((item, index) => (
                        <option value={item} key={index}>{item}</option>
                    ))}
                </select>
            </div>
            <Table
                // Props
                tableTitles={['Project', 'Date', 'Code', 'Status']}
                tableKeys={['project', 'date', 'code', 'status']}
                data={filteredData}
                actions={[
                    { emitName: 'showDetails', returnValue: 'id', icon: <BsReceipt /> },
                    { emitName: 'edit', returnValue: 'id', icon: <BsPencilSquare /> },
                    { emitName: 'delete', returnValue: 'id', icon: <BsTrash />, hover: 'hover:text-red-500' }
                ]}
                // Emits
                showDetails={(id) => console.log("showDetails", id)}
                edit={(id) => console.log("edit", id)}
                delete={(id) => console.log("delete", id)}
            />
        </>
    );
};