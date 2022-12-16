import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { useState, useEffect, useRef } from "react";
import Table from '../../Components/Organisms/Table/Table';
import Modal from "../../Components/Organism/Modal";
import axios from 'axios';

export default function ProjectsList() {
    const BASE_URL = process.env.REACT_APP_API_URL;
    const [data, setData] = useState([]);
    const projectName = useRef("");
    const [editModal, setEditModal] = useState(false);
    // in the future, we will get the token from redux
    const config = {
        headers: { Authorization: process.env.REACT_APP_API_TOKEN }
    };

    useEffect(() => {
        axios.get(BASE_URL + "/projects", config).then((res) => {
            if(res.status === 200 && res.data?.projects !== data) setData(res.data.projects);
        });
    }, []);

    // fct to use in the future (with createModal)
    const createProject = () => {
        if (!projectName.current?.value) return;
        const name = { name: projectName.current.value };
        axios.post(BASE_URL + "/projects/new/", name, config).then((res) => {
            console.log(res);
            if(res.status === 200) setData([...data, res.data.project]);
        });
    };
    // fct to use in the future (with editModal)
    const editProject = (id) => {
        axios.put(BASE_URL + "/projects/edit/" + id, data, config).then((res) => {
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

    function modalHandling(type, id)  {
        if (type === "edit") {
            console.log("edit")
            const project = data.find(item => item.id === id);
            projectName.current = project.name;
            setEditModal(true);
            
        }
    }

    return (
        <>
            <div className="flex justify-end mb-4">
                <Modal title="New Project" description="Add a new project?" type="form" openButtonMessage="Add new project" 
                    function={createProject}>
                    <form className='flex flex-col items-stretch'>
                    <label htmlFor="projectName" className="block text-sm font-medium text-gray-700"> Project Name </label>
                        <input type="text" name="projectName" id="projectName" ref={projectName} />
                    </form>
                </Modal>
            </div>
            <Table
                tableTitles={['Project', 'Created At', 'Project Key']}
                tableKeys={['name', 'created_at', 'key']}
                data={data}
                actions={[
                    { function: editProject, fctParam: 'id', icon: <BsPencilSquare /> },
                    { function: deleteProject, fctParam: 'id', icon: <BsTrash />, hover: 'hover:text-red-500' }
                ]}
            />
            <Modal title="Edit Project" description="Edit a project?" type="form" manualControl={{state: editModal, change: setEditModal}}>
                <form className='flex flex-col items-stretch'>
                    <label htmlFor="projectName" className="block text-sm font-medium text-gray-700"> Project Name </label>
                    <input type="text" name="projectName" id="projectName" ref={projectName} defaultValue={projectName.current} />
                </form>
            </Modal>
        </>
    );
};