import { createContext } from "react";

// Context to store the user name
let HomeContext = createContext({
    userName: "Guest",
    setUserName: () => {}
});

export default HomeContext;