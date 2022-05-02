import HeadingPage from "../../components/layout/HeadingPage";
import { Helmet } from "react-helmet";
import { api } from "../../constants/api.js";
import { useState, useEffect } from "react";
import SystemMessage from "../../utilities/SystemMessage.jsx";
import axios from "axios";


function Inventory() {
  const url = api + "/products";
  const [products, setProducts] = useState([]);
  
  console.log(products)
  useEffect( () => {
    async function getProducts() {
      try {
        const response = await axios.get(url);
        setProducts(response.data.data);
        console.log(response);


      } catch(error) {
        console.log(error);
        <SystemMessage content="Something went wrong" type="message error" />

      }
    }
    getProducts();
}, [url])



  return (
    <>
    <Helmet>
      <title>Inventory | Chef's app</title>
    </Helmet>
    <HeadingPage>Inventory</HeadingPage>



    </>
  )
}

export default Inventory;