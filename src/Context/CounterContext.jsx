import { createContext, useState } from "react";

export let CounterContext =createContext();

export default function CounterContextProvider(props){
    let [x, setx] = useState(0)


    return <CounterContext.Provider value={{x}}>
        {props.children}
    </CounterContext.Provider>
}