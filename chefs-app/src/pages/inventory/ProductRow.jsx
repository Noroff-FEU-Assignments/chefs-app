import Table from "react-bootstrap/Table";
import { useState } from "react";

function ProductRow({id, name, price, unit}) {
  const [stock, setStock] = useState(0);
  
  function valueCheck(e) {
   
    setStock(Number(e.target.value) * price)
  }

  return(
    <>
      <tr className="tr-product">
        <td className="td-name">{name}</td>
        <td className="td-quantity" onChange={valueCheck}><input type="number" /></td>
        {/* <td className="td-quantity" contentEditable onChange={valueCheck}></td> */}
        <td className="td-unit">{unit}</td>
        <td className="td-price">{price}</td>
        <td className="td-in-stock">{stock}</td>
      </tr>

    </>
  )
}


export default ProductRow;