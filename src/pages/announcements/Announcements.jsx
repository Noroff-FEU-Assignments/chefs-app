import HeadingPage from "../../components/layout/HeadingPage";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SystemMessage from "../../utilities/SystemMessage.jsx";
import { api } from "../../constants/api";
import { useContext } from "react";
import AuthContext from "../../utilities/AuthContext.jsx";
import axios from "axios";


let showMessage = "";
const url = api + "/announcements"
const schema = yup.object().shape({
  announcementTitle: yup.string().required("Title of the announcement").min(3, "Minimum 3 characters"),
  announcementMessage: yup.string().required("Your announcement goes here").min(10, "Minimum 10 charactes"),
})


function Announcement() {
  const { register, handleSubmit, reset, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  });
  const [auth, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    try {
      const response = await axios.post(url,
        { data: {
          title: data.announcementTitle,
          announcement: data.announcementMessage,
        }},
        
        { headers: {
          Authorization: `Bearer ${auth.data.jwt}`,
        }})

    } catch(error) {
      console.log(error)
    }
    showMessage = <SystemMessage content={`Your announcement is published`} type={"message success"} />;
    reset();
  };


  return (
    <>
      <Helmet>
        <title>Announcement | Chef's App</title>
      </Helmet>
      <HeadingPage>Announcement</HeadingPage>
    
      {showMessage}

      <Form onSubmit={handleSubmit(onSubmit)} className="form-style" id="contactForm">
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control {...register("announcementTitle")} />
          {errors.announcementTitle && <span className="form-error">{errors.announcementTitle.message}</span>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" {...register("announcementMessage")} />
          {errors.announcementMessage && <span className="form-error">{errors.announcementMessage.message}</span>}
        </Form.Group>

        <Button type="submit">
          Post
        </Button>
      </Form>
    </>
  )
}

export default Announcement;

