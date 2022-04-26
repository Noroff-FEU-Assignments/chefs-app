import HeadingPage from "../../components/layout/HeadingPage.jsx"
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SystemMessage from "../../utilities/SystemMessage.js";

let showMessage = ""
const subjectChoice = ["Equipment Service/Buy", "Other"];
const schema = yup.object().shape({
  name: yup.string().required("Your name goes here...").min(3, "Minimum 3 characters"),
  subject: yup.string().required("Please choose a subject").oneOf(subjectChoice),
  message: yup.string().required("Write your message here").min(10, "Your message should be at least 10 characters long")
})


function Contact() {
  const { register, handleSubmit, reset, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  });


  function onSubmit(data) {
    console.log(data)
    reset();
    showMessage = <SystemMessage content={"Thank you for your message"} type={"message success"} />
  };
    
  const subjectOptions = subjectChoice.map( (subjects, key) => (
    <option value={subjects} key={key}>
      {subjects}
    </option>
  ))

  return (
    <>
      <Helmet>
        <title>Contact | Chef's App</title>
      </Helmet>
      <HeadingPage>Contact</HeadingPage>
      {showMessage}

      <Form onSubmit={handleSubmit(onSubmit)} className="form-style" id="contactForm">
        <Form.Group className="mb-3">
          <Form.Label>Chef's name</Form.Label>
          <Form.Control {...register("name")} />
          {errors.firstName && <span className="form-error">{errors.firstName.message}</span>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Subject</Form.Label>
          <Form.Select {...register("subject")} aria-label="Choose subject">
            <option value={""}>Choose Subject</option>
            {subjectOptions}
          </Form.Select>
          {errors.subject && <span className="form-error">{errors.subject.message}</span>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" {...register("message")} />
          {errors.message && <span className="form-error">{errors.message.message}</span>}
        </Form.Group>

        <Button type="submit">
          Send
        </Button>
      </Form>
    </>
  )
}

export default Contact
