const Appbutton = ({ type, title, className, onClick, disabled }) => {
  return (
    <>
      <button
        type={type}
        className={className}
        onClick={onClick}
        disabled={disabled}>
        {title}
      </button>
    </>
  );
};

export default Appbutton;
