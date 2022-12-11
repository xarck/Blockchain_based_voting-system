import React, { useContext, useState } from "react";

const dataContext = React.createContext();

export function useData() {
    return useContext(dataContext);
}

export function DataProvider({ children }) {
    const [account, setAccount] = useState("");
    return (
        <dataContext.Provider value={{ account, setAccount }}>
            {children}
        </dataContext.Provider>
    );
}
