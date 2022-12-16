import { BsPersonCircle } from 'react-icons/bs';

export default function Avatar({...props}){
    return (
        <div className="inline-block h-[4.5rem] w-[4.5rem] sm:h-12 sm:w-12 overflow-hidden rounded-full bg-gray-100">
            {props.initials ? (
                <div className="flex items-center justify-center bg-dogger-orange-300 text-white rounded-full w-full h-full font-medium text-3xl sm:text-base">
                    {props.initials}
                </div>
            ) : (
                <BsPersonCircle className="h-full w-full text-gray-300"/>
            )}
        </div>
    );

}