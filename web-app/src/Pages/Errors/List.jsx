import { useState, useEffect } from "react";
import Table from '../../Components/Organisms/Table/Table';
import { BsPencilSquare, BsTrash, BsReceipt } from 'react-icons/bs';
import axios from 'axios';

export default function ErrorsList() {
    const BASE_URL = process.env.REACT_APP_API_URL;
    const config = {
        headers: { Authorization: `Bearer 1|CXGj2BlZaAhLXenPRuuFetll6ywfwwshiAqTO3mS` }
    };

    const [data, setData] = useState([]);
    const [selectedProject, setSelectedProject] = useState('All');
    const projects = [...new Set(data.map(item => item.project.name))];
    const filteredData = data.filter(item => item.project.name === selectedProject || selectedProject === 'All');

    useEffect(() => {
        axios.get(BASE_URL + "/errors", config).then((res) => {
            if(res.status === 200 && res.data?.errors !== data) setData(res.data.errors);
        });
    }, []);

    const showDetails = (id) => {
        console.log("showDetails", id);
    };
    const changeStatus = (id) => {
        console.log("changeStatus", id);
    };
    const deleteError = (id) => {
        console.log("deleteError", id);
    };

    return (
        <>
            <div className="flex justify-between mb-4 gap-4">
                <select onChange={(e) => setSelectedProject(e.target.value)} className="capitalize py-2">
                    <option value="All">All</option>
                    {projects.map((item, index) => (
                        <option value={item} key={index}>{item}</option>
                    ))}
                </select>
            </div>
            <Table
                tableTitles={['Project', 'Date', 'Code', 'Status']}
                tableKeys={[['project', 'name'], 'created_at', 'code', 'status']}
                data={filteredData}
                actions={[
                    { function: showDetails, fctParam: 'id', icon: <BsReceipt /> },
                    { function: changeStatus, fctParam: 'id', icon: <BsPencilSquare /> },
                    { function: deleteError, fctParam: 'id', icon: <BsTrash />, hover: 'hover:text-red-500' }
                ]}
            />
        </>
    );
};