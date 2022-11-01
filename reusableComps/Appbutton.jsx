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
  useKeyDown,
}) => {
  useEffect(() => {
    if (typeof window !== "undefined" && useKeyDown) {
      const handleKeyDown = (e) => {
        if (e.code === "Enter") {
          if (!disabled) onClick(e);
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [disabled, onClick, useKeyDown]);
  return (
    <>
      <button
        type={type}
        className={className}
        onClick={onClick}
        disabled={disabled}
        style={style}>
        {loading ? <Spinner animation="border" role="status" /> : title}
      </button>
    </>
  );
};

export default Appbutton;
