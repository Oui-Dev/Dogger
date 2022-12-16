import { useState, useEffect } from "react";
import Table from '../../Components/Organisms/Table/Table';
import { BsReceipt } from 'react-icons/bs';
import axios from 'axios';

export default function ErrorsList() {
    const BASE_URL = process.env.REACT_APP_API_URL;
    // in the future, we will get the token from redux
    const config = {
        headers: { Authorization: process.env.REACT_APP_TOKEN }
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
        const error = data.find(item => item.id === id);
        console.log(error);
    };

    // fct to use in the future (with showDetails slide-over)
    const changeStatus = (id) => {
        axios.put(BASE_URL + "/errors/status/" + id, {status: 1}, config).then((res) => {
            console.log(res);
            if(res.status === 200) setData(data.map(item => item.id === id ? res.data.error : item));
        });
    };
    // fct to use in the future (with showDetails slide-over)
    const assignTo = (id, email) => {
        axios.put(BASE_URL + "/errors/assign/" + id, {email: email}, config).then((res) => {
            console.log(res);
            if(res.status === 200) setData(data.map(item => item.id === id ? res.data.error : item));
        });
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
                ]}
            />
        </>
    );
};