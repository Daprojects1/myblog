import { useEffect } from "react";

const Appbutton = ({ type, title, className, onClick, disabled, style }) => {
  return (
    <>
      <button
        type={type}
        className={className}
        onClick={onClick}
        disabled={disabled}
        style={style}>
        {title}
      </button>
    </>
  );
};

export default Appbutton;
