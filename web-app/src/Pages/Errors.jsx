import { useState, useEffect } from "react";
import { BsReceipt, BsFillExclamationCircleFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import Table from '../Components/Organisms/Table/Table';
import DetailsSlideOver from '../Components/Organisms/DetailsSlideOver';
import { retrieveErrors, updateErrorAssign, updateErrorStatus } from "../Redux/Actions/errors";
import { useDispatch, useSelector } from "react-redux";

export default function Errors() {

    const [selectedProject, setSelectedProject] = useState('All');
    const [openSlideOver, setOpenSlideOver] = useState(false);
    const [selectedError, setSelectedError] = useState(null);

    const data = useSelector(state => state.errors);
    const projects = null // [...new Set(data.map(item => item.project.name))];
    const filteredData = null // data.filter(item => item.project.name === selectedProject || selectedProject === 'All');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveErrors())
    }, []);

    const formatedDate = (date) => {
        const newdate = !isNaN(Date.parse(date + " GMT")) ? new Date(date + " GMT") : new Date(date);
        return newdate.toLocaleDateString() + " " + newdate.toLocaleTimeString();
    };

    const showDetails = (id) => {
        const error = data.find(item => item.id === id);
        error.date = formatedDate(error.timestamp);
        setSelectedError(error);
        setOpenSlideOver(true);
    };

    const changeStatus = (id, status) => {
        // axios.put(BASE_URL + "/errors/status/" + id, {status: status}, config)
        //     .then((res) => {
        //         console.log(res);
        //         if(res.status === 200) {
        //             setData(data.map(item => item.id === id ? res.data.error : item));
        //             toast.success('Status changed !');
        //         }
        //     });
    };
    const assignTo = (id, email) => {
        // axios.put(BASE_URL + "/errors/assign/" + id, {email: email}, config)
        //     .then((res) => {
        //         console.log(res);
        //         if(res.status === 200) {
        //             setData(data.map(item => item.id === id ? res.data.error : item));
        //             toast.success('Assigned to ' + email);
        //         }
        //     });
    };

    return (
        <>
            <div className="flex justify-between mb-4 gap-4">
                <select onChange={(e) => setSelectedProject(e.target.value)} className="capitalize py-2">
                    <option value="All">All</option>
                    {/* {projects.map((item, index) => (
                        <option value={item} key={index}>{item}</option>
                    ))} */}
                </select>
            </div>
            {/* <Table
                tableTitles={['Project', 'Date', 'Code', 'Status']}
                tableKeys={[['project', 'name'], 'timestamp', 'code', 'status']}
                data={filteredData}
                actions={[
                    { function: showDetails, fctParam: 'id', icon: <BsReceipt /> },
                ]}
            /> */}
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