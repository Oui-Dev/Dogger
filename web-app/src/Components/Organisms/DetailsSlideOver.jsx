import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { BsX } from 'react-icons/bs'
import { useEffect } from 'react';

export default function SlideOver({ ...props }) {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState([]);
    const handleClose = () => props.handleState(false);

    useEffect(() => {
        const tmp = [];
        if(props.error) {
            tmp.push(['Project', props.error.project.name]);
            tmp.push(['Date', props.error.date]);
            if(props.error.message) tmp.push(['Message', props.error.message]);
            if(props.error.code) tmp.push(['Code', props.error.code]);
            if(props.error.path) tmp.push(['Path', props.error.path]);
            if(props.error.line) tmp.push(['At line', props.error.line]);
        }
        setError(tmp);
        setOpen(props.state);
    }, [props.state, props.error]);

    const bgIconClass = () => {
        return `flex justify-center items-center ${props.iconBg ?? 'bg-dogger-orange-500'} p-2 rounded-full w-16 h-16 md:w-20 md:h-20 text-white text-3xl md:text-4xl`;
    }

    const submitForm = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const status = form.get('status');
        const email = form.get('email');

        if(status && status != props.error.status)
            props.actions.changeStatus(props.error.id, status);
        if(email && email != props.error.email)
            props.actions.assignTo(props.error.id, email);
        handleClose();
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={handleClose}>
                <div className="fixed inset-0" />

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full md:pl-16">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                                    <div className="flex h-full flex-col bg-white shadow-xl">
                                        <div className="divide-y divide-gray-200 border-t border-gray-200 overflow-y-auto">
                                            <div className="flex items-start justify-between">
                                                <div className="py-4 md:py-6 px-4 md:px-6 flow-root md:flex md:items-end">
                                                    <div className="flex gap-6">
                                                        <div className={bgIconClass()}>
                                                            { props.icon}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Dialog.Title className="text-xl font-bold text-gray-900 md:text-2xl">{props.title}</Dialog.Title>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="p-2 flex items-center">
                                                    <button
                                                        type="button"
                                                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-dogger-orange-500"
                                                        onClick={() => handleClose()}
                                                    >
                                                        <span className="sr-only">Close panel</span>
                                                        <BsX className="text-3xl" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="px-4 py-5 sm:px-0 sm:py-0">
                                                <dl className="space-y-6 sm:space-y-0 sm:divide-y sm:divide-gray-200">
                                                    {/* Content */}
                                                    {error.map((item, index) => (
                                                        <div className="sm:flex sm:px-6 sm:py-5" key={index}>
                                                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                                                {item[0]}
                                                            </dt>
                                                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">
                                                                {item[1]}
                                                            </dd>
                                                        </div>
                                                    ))}
                                                    <form onSubmit={submitForm}>
                                                        <div className="md:flex md:px-6 md:py-5">
                                                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                                                Assign_to
                                                            </dt>
                                                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6 w-full">
                                                                <input type="email" name="email" defaultValue={props.error?.assigned_to ?? ""} />
                                                            </dd>
                                                        </div>
                                                        <div className="md:flex md:px-6 py-3 md:py-5">
                                                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                                                Status
                                                            </dt>
                                                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6 w-full">
                                                                <select name="status" defaultValue={props.error?.status}>
                                                                    <option value="0">New</option>
                                                                    <option value="1">In progress</option>
                                                                    <option value="2">Resolved</option>
                                                                </select>
                                                            </dd>
                                                        </div>
                                                        <div className="md:flex md:px-6 py-1 md:py-5">
                                                            <button className="btn-primary" type="submit">Enregistrer</button>
                                                        </div>
                                                    </form>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}