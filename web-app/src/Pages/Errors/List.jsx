import { useState, useEffect } from "react";
import Table from '../../Components/Molecules/Table/Table';
import { BsPencilSquare, BsTrash, BsReceipt } from 'react-icons/bs';
import axios from 'axios';

export default function ErrorsList() {
    const BASE_URL = process.env.REACT_APP_API_URL;
    const [data, setData] = useState([]);
    const config = {
        headers: { Authorization: `Bearer 1|CXGj2BlZaAhLXenPRuuFetll6ywfwwshiAqTO3mS` }
    };

    useEffect(() => {
        axios.get(BASE_URL + "/errors", config).then((res) => {
            console.log(res);
            if(res.status === 200 && res.data?.errors !== data) setData(res.data.errors);
        });
    }, []);

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