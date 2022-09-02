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
  touched,
  bodyClasses,
  isInitialStyles = true,
  style,
}) => {
  return (
    <div className={isInitialStyles ? `inputBody ${bodyClasses}` : bodyClasses}>
      <label htmlFor={id}>{title}</label>
      <input
        type={type}
        value={value}
        name={name}
        id={id}
        onChange={onChange}
        onBlur={onBlur}
        className={className}
        style={style}
      />
      <div className="error-msg">{touched && errors}</div>
    </div>
  );
};

export default Input;
