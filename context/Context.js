import { createContext, useState, useEffect } from "react";
import {gql, useQuery} from '@apollo/client';
import { GET_ALL_USERS } from "../query /user";

const CostContext = createContext();

const CostProvider = ({ children }) => {
  const [allCosts, setAllCost] = useState([]);
  const [users, setUsers] = useState([]);
  const { loading, error, data } = useQuery(GET_ALL_USERS);
  const [sum, setSum] = useState(0);

  useEffect( () => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
  }, [data]);

  console.log(users);

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
