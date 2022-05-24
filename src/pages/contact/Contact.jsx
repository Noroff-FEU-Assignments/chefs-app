import HeadingPage from "../../components/layout/HeadingPage.jsx"
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SystemMessage from "../../utilities/SystemMessage.jsx";
import { api } from "../../constants/api";
import axios from "axios";
import { useState } from "react";



let showMessage = ""
const url = api + "/messages"

const subjectChoice = ["Enquiry", "Other"];
const schema = yup.object().shape({
  name: yup.string().required("Your name goes here...").min(3, "Minimum 3 characters"),
  title: yup.string().required("Message title").min(3, "Minimum 3 characters"),
  subject: yup.string().required("Please choose a subject").oneOf(subjectChoice),
  message: yup.string().required("Write your message here").min(10, "Your message should be at least 10 characters long")
})


function Contact() {
  const [appear, setAppear] = useState(false)
  console.log(appear)
  const { register, handleSubmit, reset, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  });


  async function onSubmit(data) {
    try {
      const response = await axios.post(url, 
        { data: {
          chefs_name: data.name,
          message: data.message,
          subject: data.subject,
          title: data.title,
        }})
        console.log(response)
        
        if (response.status === 200) {
          showMessage = <SystemMessage content={"Message sent"} type={"message success"} />          
          setAppear(true)

          if (appear) {
          }
          console.log(appear)
        }

    } catch(error) {
      console.log(error);
      showMessage = <SystemMessage content={"Failed to send, try again later"} type={"message error"} />
    }


    if (showMessage) {
      setTimeout(() => {
        setAppear(false)
      }, 1000);
      console.log(appear)
    }
    
    reset();
    
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
          {errors.name && <span className="form-error">{errors.name.message}</span>}
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
          <Form.Label>Title</Form.Label>
          <Form.Control {...register("title")} />
          {errors.title && <span className="form-error">{errors.title.message}</span>}
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
