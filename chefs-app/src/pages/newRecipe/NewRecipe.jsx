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

let showMessage = ""
const url = api + "/recipes";

const schema = yup.object().shape({
  recipeTitle: yup.string().required("Recipe title").min(3, "Minimum 3 characters"),
  ingredients: yup.string().required("Write the recipe's ingredients").min(10, "Minimum 10 characters"),
  instructions: yup.string().required("Recipe's procedure").min(10, "Minimum 10 characters"),
})



function NewRecipe() {
  const { register, handleSubmit, reset, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  });

  const [auth, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    try {
      const response = await axios.post(url, 
        { data: {
          name: data.recipeTitle, 
          ingredients: data.ingredients, 
          instructions: data.instructions}
        },
        
        { headers: {
          Authorization: `Bearer ${auth.data.jwt}`,
        }}  )
        console.log(response)
      // console.log(response.AxiosError.response);
      // if (!response) {
      //   showMessage = <SystemMessage content="Something went wrong" type="message warning" />;
      // }

    } catch(error) {
      console.log(error);
      showMessage = <SystemMessage content="Something went wrong" type="message warning" />
    }



    console.log(data)
    reset();
    showMessage = <SystemMessage content={`${data.recipeTitle} was added succesfully to recipes`} type={"message success"} />;
  };


  return (
    <>
      <Helmet>
        <title>New Recipe | Chef's App</title>
      </Helmet>
      <HeadingPage>New Recipe</HeadingPage>
    
      {showMessage}

      <Form onSubmit={handleSubmit(onSubmit)} className="form-style" id="contactForm">
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control {...register("recipeTitle")} />
          {errors.recipeTitle && <span className="form-error">{errors.recipeTitle.message}</span>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Ingredients</Form.Label>
          <Form.Control as="textarea" {...register("ingredients")} />
          {errors.ingredients && <span className="form-error">{errors.ingredients.message}</span>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Instructions</Form.Label>
          <Form.Control as="textarea" {...register("instructions")} />
          {errors.instructions && <span className="form-error">{errors.instructions.message}</span>}
        </Form.Group>

        <Button type="submit">
          Create Recipe
        </Button>
      </Form>
    </>
  )
}

export default NewRecipe
