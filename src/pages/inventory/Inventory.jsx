import HeadingPage from "../../components/layout/HeadingPage";
import { Helmet } from "react-helmet";
import { api } from "../../constants/api.js";
import { useState, useEffect, useContext, useCallback } from "react";
import SystemMessage from "../../utilities/SystemMessage.jsx";
import axios from "axios";
import Table from "react-bootstrap/Table";
import ProductRow from "./ProductRow.jsx";
import AuthContext from "../../utilities/AuthContext";
import Spinner from "../../utilities/Spinner.jsx";

function Inventory() {
  const url = api + "/products";
  const [products, setProducts] = useState([]);
  const [auth, setAuth] = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const getProducts = useCallback(async () => {
    try {
            const response = await axios.get(url);
            setProducts(response.data.data);
          } catch(error) {
            console.log(error);
            <SystemMessage content="Something went wrong" type="message error" />
          } finally {
            setLoading(false)
          }
  }, [url])
    
useEffect( () => {
  getProducts()
}, [])

if(loading) {
  return <Spinner />;
}


// Getting the total amount of the products in stock
const total = products.reduce( (acc, product) => {
  return acc + (Number(product.attributes.in_stock))
}, 0);



// Deleting a product from the list
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

    } catch(error) {
      console.log(error);
    }
  }
}

// Sorting
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
        {products.sort(sortOut).map( (product) => {
          const {id, attributes} = product;        
          
          // products.sort(sortOut);
          
          return (
            <ProductRow key={id} productId={id} name={attributes.name} unit={attributes.unit} price={attributes.price} quantity={attributes.quantity} in_stock={attributes.in_stock} deleteRow={() => handleDelete(id)} updateSum={getProducts}/>
          )
        })}
        <tr className="tr-summary">
          <td colSpan={4}>Total:</td>
          <td>{total}</td>
        </tr>
      </tbody>
    </Table>
      <button type="button" onClick={getProducts} id="updateTotalBtn">Update Total</button>
    </>
  )
}

export default Inventory;