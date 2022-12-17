import React, {useState, createContext} from "react";

const TestContext = createContext();

const testProvider = ({children}) => {
  const [usernameValue, setUsernameValue] = useState(0);
  return(
    <TestContext.Provider value={{
      usernameValue, setUsernameValue
    }}>
      {children}
    </TestContext.Provider>
  )
}

export {testProvider, TestContext};