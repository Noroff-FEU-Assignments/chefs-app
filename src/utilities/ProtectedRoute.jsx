import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthContext";


const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useContext(AuthContext)

  if (!auth) {
    return <Navigate to="/" replace />
  }

  return (
    children
  );
};
export default ProtectedRoute;
