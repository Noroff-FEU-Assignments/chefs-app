// import React, { createContext, useEffect, useReducer, useState } from "react";
// import {api} from "../constants/api";
// import axios from "axios";
// import Spinner from "./Spinner.jsx"


// function CallApiFirst() {
//   const url = api + "/products";
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true)
  
//   useEffect( () => {
//     async function getProducts() {
//         try {
//           const response = await axios.get(url);
//           setProducts(response.data.data);
  
          
//         } catch(error) {
//           console.log(error);
//           // <SystemMessage content="Something went wrong" type="message error" />
//         } finally {
//           setLoading(false)
//         }
//       }
//       getProducts()
//   }, [])


//   if (loading) {
//     return <Spinner />
//   }



//   const inititalState = {
//     allProducts: products
//   }

// }



// export default CallApiFirst;




// export const PriceContext = createContext(inititalState);

// export const PriceContextProvider = ({children}) => {
//   const [state, dispatch] = useReducer(AppReducer, inititalState)

//   return (
//     <PriceContextProvider value={{
//       totalPrice: state.products
//     }}>
//       {children}
//     </PriceContextProvider>
//   )
// }