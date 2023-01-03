export default function Button({ children, type, ...props }) {

    let buttonStyle;
    switch (type) {
        case 'primary':
            buttonStyle = "btn-primary";
            break;
        case 'secondary':
            buttonStyle = "btn-secondary";
            break;
        case 'warning':
            buttonStyle = "btn-warning";
            break;
        default:
            buttonStyle = "btn-generic";
            break;
    }

    return (
        <button className={buttonStyle} {...props}>
            {children}
        </button>

    );
}
