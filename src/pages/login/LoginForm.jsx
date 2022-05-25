import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useContext, useState} from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SystemMessage from "../../utilities/SystemMessage.jsx";
import { api, auth_token_admin } from "../../constants/api.js"
import AuthContext from "../../utilities/AuthContext.jsx";
import axios from "axios";
import Logo from "../../images/logo-chefs.png";



const url = api + "/auth/local";

let showMessage = ""
const schema = yup.object().shape({
  username: yup.string().required("Enter your email"),
  password: yup.string().required("Enter your password"),
})


function LoginForm(props) {
  const { register, handleSubmit, reset, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  });

  const [auth, setAuth] = useContext(AuthContext);
  const navigate = useNavigate();
  
  
  async function onSubmit(data) {
    // const response = await axios.post(url, {identifier: "admin@admin.com", password: "Pass1234"})
    try {
      const response = await axios.post(url, {identifier: data.username, password: data.password})
      // console.log(response)
      // console.log()



      if (response.status === 200) {
        setAuth(response);
        navigate("/");
      }

    } catch(error) {
      console.log(error);
      showMessage = <SystemMessage content={"Wrong Username or Password"} type={"message error"} />
    }
    // console.log(data)
  };


  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        id="loginModal"
      >

      <Form onSubmit={handleSubmit(onSubmit)} className="form-style" id="loginForm">
        <img src={Logo} alt="logo" />
        <h3>Welcome 😃</h3>
        {showMessage}
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control {...register("username")} />
          {errors.username && <span className="form-error">{errors.username.message}</span>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" {...register("password")} />
          {errors.password && <span className="form-error">{errors.password.message}</span>}
        </Form.Group>

        <Button type="submit">
          Login
        </Button>
      </Form>
      </Modal>
    </>
  )
}

export default LoginForm;