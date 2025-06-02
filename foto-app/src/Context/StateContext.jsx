import { createContext, useState } from "react";

export const StateContext = createContext()


export function StateContextProvider({ children }) {
    const [sidebarIsOpen, setSıdebarIsOpen] = useState("60px")
    function handleOpenSide() {
        if (sidebarIsOpen === "330px") {
            setSıdebarIsOpen("60px")
        } else {
            setSıdebarIsOpen("330px")
        }

    }
    const [pagination, setPagination] = useState(2)


    return (
        <StateContext.Provider value={{ handleOpenSide, setSıdebarIsOpen, sidebarIsOpen, pagination, setPagination }}>
            {children}
        </StateContext.Provider>
    );

}