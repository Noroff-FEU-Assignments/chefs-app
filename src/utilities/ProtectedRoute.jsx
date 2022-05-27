import { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
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
// const ProtectedRoute = ({ children, ...rest }) => {
//   const [auth, setAuth] = useContext(AuthContext)

//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         auth && auth.data.user.email === "admin@admin.com" ? (
//           children
//         ) : (
//           <Navigate
//             to={{
//               pathname: "/",
//               state: { from: location }
//             }}
//           />
//         )
//       }
//     />
//   );
// };
// export default ProtectedRoute;