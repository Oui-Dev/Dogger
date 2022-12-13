import { Link } from "react-router-dom";
import Table from '../../Components/Molecules/Table/Table';
import { BsPencilSquare, BsTrash, BsReceipt } from 'react-icons/bs';

export default function ErrorsList() {
    const data = [
        {id: 1, project: 'test', date: '12/12/2022', code: 500, status: 'viewed'},
        {id: 2, project: 'test', date: '12/12/2022', code: 500, status: 'viewed'},
        {id: 3, project: 'test', date: '12/12/2022', code: 500, status: 'viewed'},
    ];
    
    const projects = [...new Set(data.map(item => item.project))];

    return (
        <>
            <div className="flex justify-between mb-4">
                <select name="" id="" className="capitalize">
                    <option value="All">All</option>
                    {projects.map((item, index) => (
                        <option value={item} key={index}>{item}</option>
                    ))}
                </select>
                <Link to="/projects/add" className="bg-dogger-orange-400 hover:bg-dogger-orange-500 text-white font-semibold py-2 px-4 rounded-md">Add project</Link>
            </div>
            <Table
                // Props
                tableTitles={['Project', 'Date', 'Code', 'Status']}
                tableKeys={['project', 'date', 'code', 'status']}
                data={data}
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