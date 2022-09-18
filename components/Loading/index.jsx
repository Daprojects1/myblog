import Spinner from "react-bootstrap/Spinner";

const Loading = () => {
  return (
    <div className="spinner-body">
      <Spinner animation="border" role="status" />
    </div>
  );
};

export default Loading;
