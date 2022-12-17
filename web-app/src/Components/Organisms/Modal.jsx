import { Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { BsFillExclamationTriangleFill, BsJournalPlus, BsX } from 'react-icons/bs'
import Button from '../Atoms/Button';



export default function Modal({ ...props }) {
    const submit = () => {
        props.actions.submit();
    }
    const handleClose = () => {
        props.actions.close(false);
    }

    useEffect(() => {
        const keyDownHandler = event => {
            if (event.key === 'Enter' && props.open) {
                event.preventDefault();
                submit();
                handleClose();
            } else if (event.key === 'Escape') {
                event.preventDefault();
                handleClose();
            }
        };
        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [props.open]);

    return (
        <Transition.Root show={props.open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={()=>handleClose()}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg sm:p-6">
                                <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                                    <button
                                        type="button"
                                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                                        onClick={() => handleClose()}
                                    >
                                        <span className="sr-only">Close</span>
                                        <BsX className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                                <div className="sm:flex sm:items-start">
                                    {props.type === "danger" ? (
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <BsFillExclamationTriangleFill className="h-6 w-6 text-red-600" aria-hidden="true" />
                                        </div>
                                    ) : (
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-dogger-orange-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <BsJournalPlus className="h-6 w-6 text-dogger-orange-600" aria-hidden="true" />
                                        </div>
                                    )}
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                            {props.title}
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                {props.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {props.children}
                                <div className="mt-5 sm:mt-4 flex sm:flex-row-reverse gap-2 w-full flex-col items-stretch">
                                    <Button type={props.type === "danger" ? "warning": "primary"} onClick={() => {
                                        handleClose();
                                        submit();
                                    }}>
                                        { props.type === "danger" ? "Confirm" : "OK" }
                                    </Button>
                                    <Button onClick={() => handleClose()}>
                                        Cancel
                                    </Button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}