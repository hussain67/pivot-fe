import { useParams } from "react-router-dom";

const Header = ({ showModal, setShowModal }) => {
  const { sessionId } = useParams();
  console.log(sessionId);
  return (
    <div className="Header">
      <h2 className="Header-main_header">Pivot</h2>
      <div
        className="Header-session_id"
        onClick={() => setShowModal(!showModal)}
      >
        {sessionId}
      </div>
    </div>
  );
};

export default Header;
