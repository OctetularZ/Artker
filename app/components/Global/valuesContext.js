import React, {useState, createContext} from "react";

const ValuesContext = createContext();

const valueProvider = ({children}) => {
  const [usernameValue, setUsernameValue] = useState(0);
  return(
    <ValuesContext.Provider value={{
      usernameValue, setUsernameValue
    }}>
      {children}
    </ValuesContext.Provider>
  )
}

export {valueProvider, ValuesContext};