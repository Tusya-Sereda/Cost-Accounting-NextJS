import { createContext, useState, useEffect, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../query/user";

const CostContext = createContext();

const CostProvider = ({ children }) => {
  const [allCosts, setAllCost] = useState([]);
  const { loading, error, data } = useQuery(GET_ALL_USERS);
  // const [sum, setSum] = useState(0);
  const sum = useMemo(() => {
    if (allCosts && allCosts.length > 0) {
      return allCosts.reduce((acc, value) => {
        return acc += value.cost;
      }, 0);
    } 
    return 0
  }, [allCosts]);
  
  useEffect(() => {
    if (data) setAllCost(data.getAllUsers);
  }, [data]);

  return (
    <CostContext.Provider
      value={{
        allCosts,
        setAllCost,
        sum,
        loading
      }}
    >
      {children}
    </CostContext.Provider>
  );
};

export { CostProvider, CostContext };
