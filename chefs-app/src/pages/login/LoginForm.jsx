import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useContext, useState} from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SystemMessage from "../../utilities/SystemMessage.jsx";
import { Helmet } from "react-helmet";
import Logo from "../../images/logo-chefs.png";



let showMessage = ""
const schema = yup.object().shape({
  username: yup.string().required("Enter your email"),
  password: yup.string().required("Enter your password"),
})


function LoginForm() {
  const { register, handleSubmit, reset, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  });


  function onSubmit(data) {
    console.log(data)
    showMessage = <SystemMessage content={`was added succesfully to recipes`} type={"message success"} />;
  };


  return (
    <>
      <Helmet>
        <title>Login | Chef's App</title>
      </Helmet>
      {showMessage}

      <Form onSubmit={handleSubmit(onSubmit)} className="form-style" id="loginForm">
        <img src={Logo} alt="logo" />
        <h3>Welcome 😃</h3>
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
    </>
  )
}

export default LoginForm;