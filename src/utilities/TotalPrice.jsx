import React from "react";

const PriceContext = React.createContext([null, () => {}])

export const PriceProvider = (props) => {
  return <PriceContext.Provider ></PriceContext.Provider>
}