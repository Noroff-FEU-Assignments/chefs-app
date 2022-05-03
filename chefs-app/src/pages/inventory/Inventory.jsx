import HeadingPage from "../../components/layout/HeadingPage";
import { Helmet } from "react-helmet";
import { api } from "../../constants/api.js";
import { useState, useEffect } from "react";
import SystemMessage from "../../utilities/SystemMessage.jsx";
import axios from "axios";
import Table from "react-bootstrap/Table";
import ProductRow from "./ProductRow.jsx";


function Inventory() {
  const url = api + "/products";
  const [products, setProducts] = useState([]);
  
  console.log(products)
  useEffect( () => {
    async function getProducts() {
      try {
        const response = await axios.get(url);
        setProducts(response.data.data);
        // console.log(response);


      } catch(error) {
        console.log(error);
        <SystemMessage content="Something went wrong" type="message error" />
      }
    }
    getProducts();
}, [url])



// let [sum, setSum] = useState(null)

// console.log(sum)
  return (
    <>
    <Helmet>
      <title>Inventory | Chef's app</title>
    </Helmet>
    <HeadingPage>Inventory</HeadingPage>
    <Table responsive="sm">
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Unit</th>
          <th>Price</th>
          <th>In stock (kr.)</th>
        </tr>
      </thead>
      <tbody>
        {products.map( (product) => {
          const {id, attributes} = product;
          return (
            <ProductRow key={id} name={attributes.name} unit={attributes.unit} price={attributes.price} />
          )
        })}
        <tr className="tr-summary">
          <td colSpan={3}></td>
          <td colSpan={0}>Sum</td>
          <td>0</td>
        </tr>
      </tbody>
    </Table>
    </>
  )
}

export default Inventory;