import { useState, useEffect } from "react";
import { BsReceipt, BsFillExclamationCircleFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import Table from '../Components/Organisms/Table/Table';
import DetailsSlideOver from '../Components/Organisms/DetailsSlideOver';
import { retrieveErrors, updateErrorAssign, updateErrorStatus } from "../Redux/Actions/errors";
import { retrieveProjects } from "../Redux/Actions/projects";
import { useDispatch, useSelector } from "react-redux";

export default function Errors() {

    const [selectedProject, setSelectedProject] = useState('All');
    const [openSlideOver, setOpenSlideOver] = useState(false);
    const [selectedError, setSelectedError] = useState(null);
    const [filteredData, setFilteredData] = useState([]);

    const errors = useSelector(state => state.errors);
    const projects = useSelector(state => state.projects);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveErrors())
        dispatch(retrieveProjects())
    }, []);

    useEffect(() => {
        if (selectedProject === 'All') setFilteredData(errors);
        else setFilteredData(errors.filter(error => error.project_id == selectedProject));
    }, [selectedProject, errors]);

    const formatedDate = (date) => {
        const newdate = !isNaN(Date.parse(date + " GMT")) ? new Date(date + " GMT") : new Date(date);
        return newdate.toLocaleDateString() + " " + newdate.toLocaleTimeString();
    };

    const showDetails = (id) => {
        const error = filteredData.find(item => item.id === id);
        error.date = formatedDate(error.timestamp);
        setSelectedError(error);
        setOpenSlideOver(true);
    };

    const changeStatus = (id, status) => {
        if (filteredData.find(item => item.id == id).status == status) return;
        dispatch(updateErrorStatus(id, {status: status}))
            .then(() => {
                toast.success('Status changed !');
                setFilteredData(filteredData.map(item => item.id == id ? {...item, status: status} : item));
            })
            .catch(() => toast.error('Status change failed !'));
    };
    const assignTo = (id, email) => {
        if (filteredData.find(item => item.id == id).assigned_to == email) return;
        dispatch(updateErrorAssign(id, {email: email}))
            .then(() => {
                toast.success('Assigned to ' + email);
                setFilteredData(filteredData.map(item => item.id == id ? {...item, assigned_to: email} : item));
            })
            .catch(() => toast.error('Assignment failed !'));
    };

    return (
        <>
            <div className="flex justify-between mb-4 gap-4">
                <select onChange={(e) => setSelectedProject(e.target.value)} className="capitalize py-2">
                    <option value="All">All</option>
                    {projects.map((project) => (
                        <option key={project.id} value={project.id}>{project.name}</option>
                    ))}
                </select>
            </div>
            <Table
                tableTitles={['Project', 'Date', 'Code', 'Status']}
                tableKeys={[['project', 'name'], 'timestamp', 'code', 'status']}
                data={filteredData}
                actions={[
                    { function: showDetails, fctParam: 'id', icon: <BsReceipt /> },
                ]}
            />
            <DetailsSlideOver
                state={openSlideOver}
                handleState={setOpenSlideOver}
                actions={{changeStatus: changeStatus, assignTo: assignTo}}
                error={selectedError}
                title="Error details"
                icon={<BsFillExclamationCircleFill />}
                iconBg="bg-red-500"
            />
        </>
    );
};