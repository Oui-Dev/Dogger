import { Link } from "react-router-dom";
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { useState, useEffect } from "react";
import Table from '../../Components/Molecules/Table/Table';
import axios from 'axios';

export default function ProjectsList() {
    const BASE_URL = process.env.REACT_APP_API_URL;
    const [data, setData] = useState([]);
    const config = {
        headers: { Authorization: `Bearer 1|CXGj2BlZaAhLXenPRuuFetll6ywfwwshiAqTO3mS` }
    };

    useEffect(() => {
        axios.get(BASE_URL + "/projects", config).then((res) => {
            console.log(res);
            if(res.status === 200 && res.data?.projects !== data) setData(res.data.projects);
        });
    }, []);

    return (
        <>
            <div className="flex justify-end mb-4">
                <Link to="/projects/add" className="btn-primary">Add project</Link>
            </div>
            <Table
                // Props
                tableTitles={['Project', 'Created at']}
                tableKeys={['name', 'created_at']}
                data={data}
                actions={[
                    { emitName: 'edit', returnValue: 'id', icon: <BsPencilSquare /> },
                    { emitName: 'delete', returnValue: 'id', icon: <BsTrash />, hover: 'hover:text-red-500' }
                ]}
                // Emits
                edit={(id) => console.log("edit", id)}
                delete={(id) => console.log("delete", id)}
            />
        </>
    );
};