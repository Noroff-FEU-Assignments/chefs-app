import HeadingPage from "../../components/layout/HeadingPage";
import { Helmet } from "react-helmet";
import { api } from "../../constants/api.js";
import { useState, useEffect, useContext } from "react";
import SystemMessage from "../../utilities/SystemMessage.jsx";
import axios from "axios";
import Table from "react-bootstrap/Table";
import ProductRow from "./ProductRow.jsx";
import AuthContext from "../../utilities/AuthContext";


function Inventory() {
  const url = api + "/products";
  const [products, setProducts] = useState([]);
  const [auth, setAuth] = useContext(AuthContext);
  // const [sumPrice, setSumPrice] = useState()
  // console.log(sumPrice)
    

  let sum = 0;
  function getTotal() {
     products.forEach(element => {
        let values = element.attributes.in_stock
        sum += values;
      })
    }
  getTotal();

  

useEffect( () => {
  async function getProducts() {
      try {
        const response = await axios.get(url);
        setProducts(response.data.data);
        // console.log(products)
        
      } catch(error) {
        console.log(error);
        <SystemMessage content="Something went wrong" type="message error" />
      }
    }
    getProducts();
}, [products])


async function handleDelete(id) {
  const confirmDelete = window.confirm(`Delete permanently?`);

  if (confirmDelete) {
    try {
      const deleteItem = await axios.delete(url + "/" + id, 
      { headers: {
        Authorization: `Bearer ${auth.data.jwt}`,
      }}
      );
      const removeProduct = products.filter( (product) => {
        return product.id !== id;
      })
      setProducts(removeProduct);
      console.log(deleteItem)
    } catch(error) {
      console.log(error);
    }
  }
}

function sortOut(a, b) {
  return a.attributes.name > b.attributes.name ? 1 : -1;
}

      
  return (
    <>
    <Helmet>
      <title>Inventory | Chef's app</title>
    </Helmet>
    <HeadingPage>Inventory</HeadingPage>
    <Table responsive="sm">
      <thead>
        <tr className="tr-head">
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
          
          products.sort(sortOut);
          

          return (
            <ProductRow key={id} productId={id} name={attributes.name} unit={attributes.unit} price={attributes.price} quantity={attributes.quantity} in_stock={attributes.in_stock} deleteRow={() => handleDelete(id)} />
          )
        })}
        <tr className="tr-summary">
          <td colSpan={4}>Total:</td>
          {/* <td>{sumPrice}</td> */}
          <td>{sum}</td>
        </tr>
      </tbody>
    </Table>
    </>
  )
}

export default Inventory;