import HeadingPage from "../../components/layout/HeadingPage";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SystemMessage from "../../utilities/SystemMessage.jsx";
import { useEffect, useState } from "react";

let showMessage = "";
let unitChoice = ["g", "kg", "ml", "l", "stk", "handfull"];
let areaChoice = ["Walk-in fridge", "Walk-in freezer", "Fridge 1", "Fridge 2", "Freezer 1", "Freezer 2"]
const schema = yup.object().shape({
  product: yup.string().required("Product's name").min(3, "Minimum 3 characters"),
  price: yup.number(),
  discount: yup.number(),
  finalprice: yup.string(),
  unit: yup.string().required("Please choose a unit").oneOf(unitChoice),
  area: yup.string().required("Please choose an area").oneOf(areaChoice),
})


function NewInventoryItem() {
  const { register, handleSubmit, reset, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  });


  function onSubmit(data) {
    console.log(data)
    showMessage = <SystemMessage content={`${data.product} was added succesfully to recipes`} type={"message success"} />;
  };

  const unitOptions = unitChoice.map( (unit, key) => (
    <option value={unit} key={key}>
      {unit}
    </option>
  ))

  const areaOptions = areaChoice.map( (area, key) => (
    <option value={area} key={key}>
      {area}
    </option>
  ))

  // let justNum = 3;
  // let valueSum = "";

  const [input, setInput] = useState({
    num1: 0,
    num2: 0,
  });

  const [result, setResult] = useState("");
  
  // console.log(result)

  // useEffect( () => {
  //   setResult(input.num1 + input.num2)
  // }, [input]);
  useEffect( () => {
    setResult(parseFloat(input.num1) + parseFloat(input.num2))
  }, [input]);

  const handleInput = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    });
  }


  return (
    <>
      <Helmet>
        <title>New Inventory Item | Chef's App</title>
      </Helmet>
      <HeadingPage>New Inventory Item</HeadingPage>
    
      {showMessage}

      <Form onSubmit={handleSubmit(onSubmit)} className="form-style" id="contactForm">
        <Form.Group className="mb-3">
          <Form.Label>Product</Form.Label>
          <Form.Control {...register("product")} />
          {errors.product && <span className="form-error">{errors.product.message}</span>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price (kr.)</Form.Label>
          <Form.Control {...register("price")} onChange={handleInput} type="number" name="num1" value={input.num1} required/>
          {errors.price && <span className="form-error">{errors.price.message}</span>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Discount (%)</Form.Label>
          <Form.Control {...register("discount")} onChange={handleInput} type="number" name="num2" value={input.num2}/>
          {errors.discount && <span className="form-error">{errors.discount.message}</span>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Final Price</Form.Label>
          <Form.Control {...register("finalprice")} value={result} disabled/>
          {errors.finalprice && <span className="form-error">{errors.finalprice.message}</span>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Counting Unit</Form.Label>
          <Form.Select {...register("unit")} aria-label="Choose unit">
            <option value={""}>Choose Unit</option>
            {unitOptions}
          </Form.Select>
          {errors.unit && <span className="form-error">{errors.unit.message}</span>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Area</Form.Label>
          <Form.Select {...register("area")} aria-label="Choose area">
            <option value={""}>Choose Area</option>
            {areaOptions}
          </Form.Select>
          {errors.area && <span className="form-error">{errors.area.message}</span>}
        </Form.Group>

        <Button type="submit">
          Add Item
        </Button>
      </Form>
    </>
  )
}

export default NewInventoryItem;
