import { Link } from "react-router-dom";
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { useState, useEffect } from "react";
import Table from '../../Components/Organisms/Table/Table';
import axios from 'axios';

export default function ProjectsList() {
    const BASE_URL = process.env.REACT_APP_API_URL;
    const [data, setData] = useState([]);
    // in the future, we will get the token from redux
    const config = {
        headers: { Authorization: `Bearer 1|CXGj2BlZaAhLXenPRuuFetll6ywfwwshiAqTO3mS` }
    };

    useEffect(() => {
        axios.get(BASE_URL + "/projects", config).then((res) => {
            if(res.status === 200 && res.data?.projects !== data) setData(res.data.projects);
        });
    }, []);

    // fct to use in the future (with createModal)
    const createProject = (data) => {
        axios.post(BASE_URL + "/projects/new/", data, config).then((res) => {
            console.log(res);
            if(res.status === 200) setData([...data, res.data.project]);
        });
    };
    // fct to use in the future (with editModal)
    const editProject = (id) => {
        axios.put(BASE_URL + "/projects/edit/" + id, {name: 'ouais'}, config).then((res) => {
            console.log(res);
            if(res.status === 200) setData(data.map(item => item.id === id ? res.data.project : item));
        });
    };
    // fct to use in the future (with warningModal)
    const deleteProject = (id) => {
        axios.delete(BASE_URL + "/projects/delete/" + id, config).then((res) => {
            console.log(res);
            if(res.status === 200) setData(data.filter(item => item.id !== id));
        });
    };

    return (
        <>
            <div className="flex justify-end mb-4">
                <Link to="/projects/add" className="btn-primary">Add project</Link>
            </div>
            <Table
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