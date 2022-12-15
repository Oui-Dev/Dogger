import { BsPersonCircle } from 'react-icons/bs';

export default function Avatar({...props}){
    return (
        <div className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
            {props.initials ? (
                <div className="flex items-center justify-center bg-dogger-orange-300 text-white rounded-full h-12 w-12 tracking-widest font-bold">
                    {props.initials}
                </div>
            ) : (
                <BsPersonCircle className="h-full w-full text-gray-300"/>
            )}
        </div>
    );

}