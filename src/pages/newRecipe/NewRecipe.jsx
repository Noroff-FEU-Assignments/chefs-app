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

// Form validation
const schema = yup.object().shape({
  recipeTitle: yup.string().required("Recipe title").min(3, "Minimum 3 characters"),
  ingredients: yup.string().required("Write the recipe's ingredients").min(10, "Minimum 10 characters"),
  instructions: yup.string().required("Recipe's procedure").min(10, "Minimum 10 characters"),
})


function NewRecipe() {
  const { register, handleSubmit, reset, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  });

  // Adding new recipe after authorization check
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

        if (response.status === 200) {
          showMessage = <SystemMessage content={`${data.recipeTitle} was added succesfully to recipes`} type={"message success"} />;
        } else {
          showMessage = <SystemMessage content="Something went wrong" type={"message error"} />;
        }

    } catch(error) {
      console.log(error);
      showMessage = <SystemMessage content="Something went wrong" type="message warning" />
    }
    reset();
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
          <Form.Label>Ingredients <span className="form-instructions">*Add a dash (-) in front of every ingredient</span></Form.Label>
          <Form.Control as="textarea" {...register("ingredients")} />
          {errors.ingredients && <span className="form-error">{errors.ingredients.message}</span>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Instructions <span className="form-instructions">*Add numbering in front of every step</span></Form.Label>
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
