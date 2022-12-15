import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import Table from '../../Components/Molecules/Table/Table';
import Modal from "../../Components/Organism/Modal";

export default function ProjectsList() {
    const data = [
        { id: 1, name: 'test1', created_at: 'test1' },
        { id: 2, name: 'test2', created_at: 'test2' },
        { id: 3, name: 'test3', created_at: 'test3' }
    ]; return (
        <>
            <form className="flex justify-end mb-4">
                <Modal title="New Project" description="Add a new project?" type="form" openButtonMessage="Add new project">
                    <div className='w-full flex flex-col items-stretch my-3'>
                    <label htmlFor="projectName" className="block text-sm font-medium text-gray-700"> Project Name </label>
                    <input type="text" name="projectName" id="projectName" />
                    </div>
                </Modal>
            </form>
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