import { useState } from "react";
import axios from "axios";
import { api } from "../../constants/api.js";


function ProductRow({productId, name, price, unit, quantity, in_stock}) {

  const url = api + `/products/${productId}`;

  const [stock, setStock] = useState(in_stock);
  const [myQuantity, setMyQuantity] = useState(quantity);
  // console.log(stock);
  
  function updateProduct(e) {
    const newQuantity = Number(e.target.value);
    setStock(newQuantity * price);
    setMyQuantity(e.target.value);
  }

  async function sendProduct() {
    try {
      const putResponse = await axios.put(url, {
        data: {
          quantity: myQuantity,
          in_stock: stock,
        },
      });
    } catch(error) {
      console.log(error);
    }
  }
  sendProduct();

  return(
    <>
      <tr className="tr-product">
        <td className="td-name">{name}</td>
        <td className="td-quantity">
          <input type="number" onChange={ (e) => updateProduct(e)} value={myQuantity}  />
        </td>
        <td className="td-unit">{unit}</td>
        <td className="td-price">{price}</td>
        <td className="td-in-stock">
          {stock}
        </td>
      </tr>

    </>
  )
}


export default ProductRow;