import { useContext, useState } from "react";
import axios from "axios";
import { api } from "../../constants/api.js";
import AuthContext from "../../utilities/AuthContext.jsx";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';


function ProductRow({productId, name, price, unit, quantity, in_stock, deleteRow, updateSum}) {

  const url = api + `/products/${productId}`;
  const [stock, setStock] = useState(in_stock);
  const [myQuantity, setMyQuantity] = useState(quantity);
  const [newPrice, setNewPrice] = useState(price);
  const [auth, setAuth] = useContext(AuthContext);
  
  function updateProduct(e) {
    const newQuantity = Number(e.target.value);
    setStock(newQuantity * price);
    setMyQuantity(e.target.value);
    // updateSum();
  }

  function updateMainPrice(e) {
    const myNewPrice = Number(e.target.value);
    setStock(quantity * myNewPrice);
    setNewPrice(e.target.value);
  }
  
  async function sendProduct() {
    try {
      const putResponse = await axios.put(url, {
        data: {
          quantity: myQuantity,
          in_stock: stock,
          price: newPrice,
        },
      });
    } catch(error) {
      console.log(error);
    }
  }
  sendProduct();


  
  let priceData = "";
  let deleteBtn = "";
  
  if (auth && auth.data.user.email === "admin@admin.com") {
    priceData = <td className="td-price">
                  <input type="number" onChange={ (e) => updateMainPrice(e)} value={newPrice} />
                </td>
    // deleteBtn = <td><button onClick={deleteRow} id="deleteRowBtn"><FontAwesomeIcon icon={solid('trash')}/></button></td>
    deleteBtn = <td><button onClick={deleteRow} id="deleteRowBtn"></button></td>
  } else {
    priceData =  <td className="td-price">{price}</td>
  }


  return(
    <>
      <tr className="tr-product">
        <td className="td-name">{name}</td>
        <td className="td-quantity">
          <input type="number" onChange={ (e) => updateProduct(e) } value={myQuantity}  />
          {/* <input type="number" onChange={ (e) => updateProduct(e); {updateSum}} value={myQuantity}  /> */}
        </td>
        <td className="td-unit">{unit}</td>
        {priceData}
        <td className="td-in-stock">
          {stock}
        </td>
        {deleteBtn}
      </tr>

    </>
  )
}


export default ProductRow;