import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { api } from "../../constants/api.js";
import Spinner from "../../utilities/Spinner.jsx";
import HeadingPage from "../../components/layout/HeadingPage.jsx";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SystemMessage from "../../utilities/SystemMessage.jsx";
import axios from "axios";


let showMessage = ""
const schema = yup.object().shape({
  recipeTitle: yup.string().required("Recipe title").min(3, "Minimum 3 characters"),
  ingredients: yup.string().required("Write the recipe's ingredients").min(10, "Minimum 10 characters"),
  instructions: yup.string().required("Recipe's procedure").min(10, "Minimum 10 characters"),
})


function EditRecipe() {
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  const {id} = useParams();
  const editURL = api + "/recipes/" + id;

  const { register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  });

  useEffect( () => {
    async function getRecipe() {
      try {
        const response = await axios.get(editURL);
        setCurrentRecipe(response.data.data)

      } catch(error) {
        console.log(error);

      } finally {
        setLoading(false);
      }
    }
    getRecipe()
  }, [editURL])

  if (loading) {
    return <Spinner />
  }


  async function onSubmit(data) {
    try {
      const putResponse = await axios.put(editURL, 
        { data: {
        name: data.recipeTitle, 
        ingredients: data.ingredients, 
        instructions: data.instructions}
      }
      )
      if(putResponse.status === 200) {
        showMessage = <SystemMessage content={`${data.recipeTitle} was updated succesfully`} type={"message success"} />;
      }

    } catch(error) {
      console.log(error);
      showMessage = <SystemMessage content="Something went wrong" type="message warning" />
    }
  };

return (
  <>
    <Helmet>
      <title>Editing: {currentRecipe.attributes.name} recipe</title>
    </Helmet>
    <HeadingPage>{currentRecipe.attributes.name}</HeadingPage>
  
    {showMessage}
    
    <Form onSubmit={handleSubmit(onSubmit)} className="form-style" id="contactForm">
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control {...register("recipeTitle")} defaultValue={currentRecipe.attributes.name}/>
        {errors.recipeTitle && <span className="form-error">{errors.recipeTitle.message}</span>}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Ingredients</Form.Label>
        <Form.Control as="textarea" {...register("ingredients")} defaultValue={currentRecipe.attributes.ingredients}/>
        {errors.ingredients && <span className="form-error">{errors.ingredients.message}</span>}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Instructions</Form.Label>
        <Form.Control as="textarea" {...register("instructions")} defaultValue={currentRecipe.attributes.instructions} />
        {errors.instructions && <span className="form-error">{errors.instructions.message}</span>}
      </Form.Group>
      <Button type="submit">
        Update
      </Button>
    </Form>
  </>
  )
}

export default EditRecipe;
