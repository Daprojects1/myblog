import { useEffect } from "react";
import { Spinner } from "react-bootstrap";

const Appbutton = ({
  type,
  title,
  className,
  onClick,
  disabled,
  style,
  loading,
}) => {
  return (
    <>
      <button
        type={type}
        className={className}
        onClick={onClick}
        disabled={disabled}
        style={style}>
        {!loading && title}
        {loading && <Spinner animation="border" role="status" />}
      </button>
    </>
  );
};

export default Appbutton;
