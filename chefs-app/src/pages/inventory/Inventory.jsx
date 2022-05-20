import HeadingPage from "../../components/layout/HeadingPage";
import { Helmet } from "react-helmet";
import { api } from "../../constants/api.js";
import { useState, useEffect } from "react";
import SystemMessage from "../../utilities/SystemMessage.jsx";
import axios from "axios";
import Table from "react-bootstrap/Table";
import ProductRow from "./ProductRow.jsx";
import useLocalStorage from "../../hooks/useLocalStorage";


function Inventory() {
  const url = api + "/products";
  const [products, setProducts] = useState([]);
  const [newSum, setNewSum] = useLocalStorage("sum", null)
  console.log(newSum)
  // console.log(products);
  // console.log(products)
  

  // function updateSum() {
  //   let sum = 0;
  //   products.forEach(element => {
  //       let values = element.attributes.in_stock
  //       sum += values;
  //       console.log(sum);
  //       setNewSum(sum);
  //   })
  // }
//   let sum = 0;
//   useEffect( () => {
//     products.forEach(element => {

//           let values = element.attributes.in_stock
//           sum += values;
//           console.log(sum);
//           setNewSum(sum);
//         })

// }, [newSum]);

// useEffect( () => {
//   setNewSum(JSON.parse(window.localStorage.getItem("sum")))
// }, []);


let sum = 0;

useEffect( () => {
  async function getProducts() {
      try {
        const response = await axios.get(url);
        setProducts(response.data.data);

        products.forEach(element => {
          let values = element.attributes.in_stock
          sum += values;
          
        });
        setNewSum(sum)
          console.log(newSum)
        // updateSum()
        
        
        console.log(response);
      } catch(error) {
        console.log(error);
        <SystemMessage content="Something went wrong" type="message error" />
      }
    }
    getProducts();
}, [products])


      
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
            <ProductRow key={id} productId={id} name={attributes.name} unit={attributes.unit} price={attributes.price} quantity={attributes.quantity} in_stock={attributes.in_stock} />
          )
        })}
        <tr className="tr-summary">
          <td colSpan={3}></td>
          <td colSpan={0}>Total</td>
          {/* <td>
            <input onChange={updateSum} value={newSum} /> 
          </td> */}
          <td>{newSum}</td>
        </tr>
      </tbody>
    </Table>
    </>
  )
}

export default Inventory;