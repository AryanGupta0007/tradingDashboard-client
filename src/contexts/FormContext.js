import {createContext, useState} from 'react'
export const FormContext = createContext()
export const FormState = (props) => {
    const [formState, setFormState] = useState({"type": "BUY"})
    const updateFormState = (name, value) => {
        const currentState = {...formState}
        console.log('hfskhf', name, value)
        if (name === "symbol"){
            value = value.toUpperCase()
        }
        currentState[name] = value
        setFormState(currentState)
    }
    const editForm = (rowData) => {
        console.log("editing", rowData)
        setFormState(rowData)

    }
    const clearForm = () => {
        setFormState({
            "symbol": "",
            "qty": "",
            "type": "BUY",
            "order_price":  "",
            "target": "",
            "sl": "",
        })
    }
    return <FormContext.Provider value={{formState, updateFormState, editForm, clearForm}}>
        {props.children}
    </FormContext.Provider>
}