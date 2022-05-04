import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm} from "react-hook-form";
import axios from "axios";
import { api } from "../../constants/api.js";


const schema = yup.object().shape({
  quantity: yup.number(),
})

function ProductRow({productId, name, price, unit, quantity}) {

  const url = api + `/products/${productId}`;
  const { register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  });

  const [stock, setStock] = useState(0);
  
  async function updateProduct(data, e) {
    setStock(Number(e.target.value) * price)

    try {
      const putResponse = await axios.put(url,
      { data: {
        quantity: data.quantity
      }});
      console.log(data);
      console.log(putResponse);
    } catch(error) {
      console.log(error);
    }
  }

  return(
    <>
      <tr className="tr-product">
        <td className="td-name">{name}</td>
        <td className="td-quantity" onChange={handleSubmit(updateProduct)}><input type="number" {...register("quantity")}  /></td>
        {/* <td className="td-quantity" onChange={handleSubmit(updateProduct)}><input type="number" {...register("quantity")}  value={quantity} /></td> */}
        <td className="td-unit">{unit}</td>
        <td className="td-price">{price}</td>
        <td className="td-in-stock">{stock}</td>
      </tr>

    </>
  )
}


export default ProductRow;