import { createContext, useState } from "react";

const CostContext = createContext();

const CostProvider = ({ children }) => {
  const [allCosts, setAllCost] = useState([]);
  const [sum, setSum] = useState("");

  return (
    <CostContext.Provider
      value={{
        allCosts,
        setAllCost,
        sum,
        setSum,
      }}
    >
      {children}
    </CostContext.Provider>
  );
};

export { CostProvider, CostContext };