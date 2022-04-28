import LoginForm from "./LoginForm.jsx";
import { Helmet } from "react-helmet";

function Login() {
  return (
    <>
      <Helmet>
        <title>Login | Chef's App</title>
      </Helmet>
      <LoginForm/>
    </>
  )
}

export default Login
