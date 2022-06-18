import { Navigate } from "react-router-dom";
import { getUserFromLocalStorage } from "../utils/localstorage";

const ProtectedRoute = ({ children }) => {
  const user = getUserFromLocalStorage("user");
  if (!user) {
    return <Navigate to="/home" />;
  }
  return children;
};

export default ProtectedRoute;
