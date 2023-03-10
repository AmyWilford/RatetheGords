import "./styles.css";

const Loading = ({loadType}) => {
  return (
    <div className="d-flex flex-column align-items-center pt-3">
      <div className="loader"></div>
      <div>Getting the {loadType}</div>
    </div>
  );
};

export default Loading;
