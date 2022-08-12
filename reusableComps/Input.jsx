
const Input = ({
    type,
    value,
    name,
    id,
    onChange,
    onBlur,
    errors,
    title,
    className,
    touched
}) => {
    return ( 
        <div className="inputBody"> 
            <label htmlFor={id}>{title}</label>
            <input
                type={type}
                value={value}
                name={name}
                id={id}
                onChange={onChange}
                onBlur={onBlur}
                className={className}
            />
            <div className="error-msg">{ touched && errors}</div>
        </div>
     );
}
 
export default Input;