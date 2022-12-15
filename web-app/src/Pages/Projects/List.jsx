import { Link } from "react-router-dom";
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { useState, useEffect } from "react";
import Table from '../../Components/Organisms/Table/Table';
import axios from 'axios';

export default function ProjectsList() {
    const BASE_URL = process.env.REACT_APP_API_URL;
    const [data, setData] = useState([]);
    const config = {
        headers: { Authorization: `Bearer 1|CXGj2BlZaAhLXenPRuuFetll6ywfwwshiAqTO3mS` }
    };

    useEffect(() => {
        axios.get(BASE_URL + "/projects", config).then((res) => {
            if(res.status === 200 && res.data?.projects !== data) setData(res.data.projects);
        });
    }, []);

    const editProject = (id) => {
        console.log("editProject", id);
    };
    const deleteProject = (id) => {
        console.log("deleteProject", id);
    };

    return (
        <>
            <div className="flex justify-end mb-4">
                <Link to="/projects/add" className="btn-primary">Add project</Link>
            </div>
            <Table
                // Props
                tableTitles={['Project', 'Created at', 'Project key']}
                tableKeys={['name', 'created_at', 'key']}
                data={data}
                actions={[
                    { function: editProject, fctParam: 'id', icon: <BsPencilSquare /> },
                    { function: deleteProject, fctParam: 'id', icon: <BsTrash />, hover: 'hover:text-red-500' }
                ]}
            />
        </>
    );
};