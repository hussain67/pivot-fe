import { Navigate } from "react-router-dom";
import { getItemFromLocalStorage } from "../utils/localstorage";

const ProtectedRoute = ({ children }) => {
  const user = getItemFromLocalStorage("user");
  if (!user) {
    return <Navigate to="/home" />;
  }
  return children;
};

export default ProtectedRoute;
