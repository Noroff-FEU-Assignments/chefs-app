import HeadingPage from "../../components/layout/HeadingPage";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SystemMessage from "../../utilities/SystemMessage.jsx";

let showMessage = ""
const schema = yup.object().shape({
  recipeTitle: yup.string().required("Recipe title").min(3, "Minimum 3 characters"),
  ingredients: yup.string().required("Write the recipe's ingredients").min(10, "Minimum 10 characters"),
  instructions: yup.string().required("Recipe's procedure").min(10, "Minimum 10 characters"),
})


function NewRecipe() {
  const { register, handleSubmit, reset, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  });


  function onSubmit(data) {
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
