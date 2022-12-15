export default function Button ({children, type, ...props}) {

    let buttonStyle;
    if (type === 'primary') {
        buttonStyle = "btn-primary"
    } else if (type === 'secondary') {
        buttonStyle = "btn-secondary"
    } else if (type === 'warning'){
        buttonStyle = "btn-warning"
    } else {
        buttonStyle = "btn-generic";
    }

    return (
        <button className={buttonStyle} {...props}>
            {children}
        </button>
        
    );
}
