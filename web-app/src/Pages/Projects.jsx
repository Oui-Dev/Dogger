import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Button from '../Components/Atoms/Button';
import Table from '../Components/Organisms/Table/Table';
import Modal from '../Components/Organisms/Modal';


export default function ProjectsList() {
    const BASE_URL = process.env.REACT_APP_API_URL;
    const [data, setData] = useState([]);
    const projectName = useRef("");
    const [openFormModal, setOpenFormModal] = useState(false);
    const [openDangerModal, setOpenDangerModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState("");
    const [projectId, setProjectId] = useState("");
    const [newProject, setNewProject] = useState(true);

    const handleDangerModal = (id) => {
        setOpenDangerModal(true)
        setProjectId(id)
    };

    const handleEditModal = (id) => {
        projectName.current = data.find(item => item.id === id).name
        setProjectId(id)
        setNewProject(false)
        setModalTitle("Edit Project")
        setModalContent("Please enter a new name for your project")
        setOpenFormModal(true)
        createOrEdit()
    };

    const createOrEdit = () => {
        if (newProject) {
            createProject()
        } else {
            editProject(projectId)
        }
    }

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
    const editProject = () => {
        const name = { name: projectName.current.value };
        if (!name.name  || !projectId) return;
        axios.put(BASE_URL + "/projects/edit/" + projectId, name, config).then((res) => {
            console.log(res);
            if (res.status === 200) setData(data.map(item => item.id === projectId ? res.data.project : item));
        });
    };
    // fct to use in the future (with warningModal)
    const deleteProject = () => {
        if (!projectId) return;
        axios.delete(BASE_URL + "/projects/delete/" + projectId, config).then((res) => {
            console.log(res);
            if (res.status === 200) setData(data.filter(item => item.id !== projectId));
        });
    };

    return (
        <>
            <div className="flex justify-end mb-4">
                <Button
                type={"primary"}
                onClick={() => {
                    setOpenFormModal(true)
                    setNewProject(true)
                    setModalTitle("Create Project")
                    setModalContent("Please enter a name for your project")
                }}>Create Project</Button>
            </div>
            <Table
                tableTitles={['Project', 'Created At', 'Project Key']}
                tableKeys={['name', 'created_at', 'key']}
                data={data}
                actions={[
                    { function: handleEditModal, fctParam: 'id', icon: <BsPencilSquare /> },
                    { function: handleDangerModal, fctParam: 'id', icon: <BsTrash />, hover: 'hover:text-red-500' }
                ]}
            />
            {openFormModal &&
            <Modal
                title={modalTitle}
                description={modalContent}
                type="form"
                open={openFormModal}
                actions={{ close: setOpenFormModal, submit: createOrEdit }}>
                <form className='flex flex-col items-stretch'>
                    <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">Enter Name:</label>
                    <input type="text" name="projectName" id="projectName" ref={projectName} defaultValue={projectName.current} />
                </form>
            </Modal>
            }
            {openDangerModal &&
            <Modal
                title="Warning !"
                description="This action is irreversible. Are you sure you want to delete this project ?"
                type="danger"
                open={openDangerModal}
                actions={{ close: setOpenDangerModal, submit: deleteProject}}>
            </Modal>
            }
        </>
    );
};