import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { useState, useEffect, useRef } from "react";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { retrieveProjects } from "../Redux/Actions/projects";
import Button from '../Components/Atoms/Button';
import Table from '../Components/Organisms/Table/Table';
import Modal from '../Components/Organisms/Modal';


export default function ProjectsList() {

    const [projects, setProjects] = useState([]);
    const projectName = useRef("");
    const [openFormModal, setOpenFormModal] = useState(false);
    const [openDangerModal, setOpenDangerModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState("");
    const [projectId, setProjectId] = useState("");
    const [newProject, setNewProject] = useState(true);

    const data = useSelector(state => state.projects);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveProjects())
    }, []);


    const handleDangerModal = (id) => {
        setOpenDangerModal(true);
        setProjectId(id);
    };

    const handleEditModal = (id) => {
        projectName.current = data.find(item => item.id === id).name;
        setProjectId(id);
        setNewProject(false);
        setModalTitle("Edit Project");
        setModalContent("Please enter a new name for your project");
        setOpenFormModal(true);
        createOrEdit();
    };

    const createOrEdit = () => {
        if (newProject) createProject();
        else editProject(projectId);
    }

    const createProject = () => {
        if (!projectName.current?.value) return;
        const name = { name: projectName.current.value };
        // dispatch(postProject(name));
    };

    const editProject = () => {
        const name = { name: projectName.current.value };
        if (!name.name  || !projectId) return;
        // axios.put(BASE_URL + "/projects/edit/" + projectId, name, config).then((res) => {
        //     console.log(res);
        //     if (res.status === 200) {
        //         setProjects(data.map(item => item.id === projectId ? res.data.project : item));
        //         toast.success('Project edited !');
        //     };
        // });
    };

    const deleteProject = () => {
        if (!projectId) return;
        // axios.delete(BASE_URL + "/projects/delete/" + projectId, config).then((res) => {
        //     console.log(res);
        //     if (res.status === 200) {
        //         setProjects(data.filter(item => item.id !== projectId));
        //         toast.success('Project deleted !');
        //     };
        // });
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
                    }}>
                    Create Project
                </Button>
            </div>
            <Table
                tableTitles={['Project', 'Created At', 'Project Key']}
                tableKeys={['name', 'created_at', 'key']}
                data={data.projects || []}
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
                    actions={{ close: setOpenDangerModal, submit: deleteProject }}>
                </Modal>
            }
        </>
    );
};