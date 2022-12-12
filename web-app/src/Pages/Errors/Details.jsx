import { useParams } from "react-router-dom";

export default function ErrorsDetails() {
    const { id } = useParams();

    return (
        <div>{ id }</div>
    );
};