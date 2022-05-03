import HeadingPage from "../../components/layout/HeadingPage";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SystemMessage from "../../utilities/SystemMessage.jsx";
import { useEffect, useState } from "react";
import { api } from "../../constants/api";
import { useContext } from "react";
import AuthContext from "../../utilities/AuthContext.jsx";
import axios from "axios";

let showMessage = "";
const url = api + "/products";

let unitChoice = ["g", "kg", "ml", "l", "bag", "stk", "handfull"];
let areaChoice = ["Walk-in fridge", "Walk-in freezer", "Fridge 1", "Fridge 2", "Freezer 1", "Freezer 2"]
const schema = yup.object().shape({
  product: yup.string().required("Product's name").min(3, "Minimum 3 characters"),
  price: yup.number(),
  discount: yup.number(),
  finalprice: yup.number(),
  unit: yup.string().required("Please choose a unit").oneOf(unitChoice),
  area: yup.string().required("Please choose an area").oneOf(areaChoice),
})


function NewInventoryItem() {
  const [productPrice, setProductPrice] = useState(0);
  const [discount, setDiscount] = useState(0);


  const { register, handleSubmit, setValue, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  });

  useEffect( () => {
    let finalPrice = 0

    if(productPrice !== 0) {
      if(discount === 0) {
        finalPrice = productPrice;
      } else {
        finalPrice = (productPrice - (productPrice * (discount / 100)) );
      }
    }

    setValue("finalprice", finalPrice);
  }, [productPrice, discount, setValue]);


  const [auth, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    try {
      const response = await axios.post(url,
        { data: {
          name: data.product,
          unit: data.unit,
          area: data.area,
          price: data.finalprice
        }},

        { headers: {
          Authorization: `Bearer ${auth.data.jwt}`,
        }}
      )
      console.log(response)
    } catch(error) {
      console.log(error);
      showMessage = <SystemMessage content={`Something wrong happened`} type={"message error"} />;
    }



    console.log(data)
    showMessage = <SystemMessage content={`${data.product} was added succesfully to inventory`} type={"message success"} />;
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


  function handleDiscount(event) {

    if(event.target.name === "price") {
      setProductPrice(event.target.value);
    }

    if(event.target.name === "discount") {
      setDiscount(event.target.value);
    }
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
          <Form.Control {...register("price")} onChange={handleDiscount} type="number" name="price" />
          {errors.price && <span className="form-error">{errors.price.message}</span>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Discount (%)</Form.Label>
          <Form.Control {...register("discount")} onChange={handleDiscount}  name="discount" />
          {errors.discount && <span className="form-error">{errors.discount.message}</span>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Final Price</Form.Label>
          <Form.Control {...register("finalprice")} disabled/>
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
