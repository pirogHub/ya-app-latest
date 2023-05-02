import React, { useContext } from "react";


const DragNDropContext = React.createContext()



export const useDragNDrop = () => {
    return useContext(DragNDropContext)
}


const DragNDropProvider = ({ children }) => {


    const handleOnDrop = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files?.length) {
            return (e.dataTransfer.files)
        }
        else if (e.dataTransfer.items) {
            const dti = e.dataTransfer.items;
            return (dti)
        }

        return null
    }

    const ignoreOnDragOver = (e) => {
        e.stopPropagation()
        e.preventDefault();
        return false
    }

    const checkWorkingAtConsole = () => {

    }


    return (
        <DragNDropContext.Provider value={{ handleOnDrop, ignoreOnDragOver, checkWorkingAtConsole }}>
            {children}
        </DragNDropContext.Provider>
    )
}

export default DragNDropProvider