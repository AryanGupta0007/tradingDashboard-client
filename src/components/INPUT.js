import {useContext, useEffect} from 'react'
import {FormContext} from '../contexts/FormContext.js'
export const INPUT = (props) => {
    const {formState, updateFormState} = useContext(FormContext)
    useEffect(() => {
        console.log(formState)
    }, [formState])
    const onChange = (e) => {
        const {name, value} = e.target
        console.log(name, value)
        updateFormState(name, value)
    }

    return (
        <>
            <div
                className="input flex justify-center max-w-lg space-y-6 font-[sans-serif] text-[#333]">
                <input type='text' placeholder={"enter...."}
                       style={{"border-radius": "0"}} value={formState[props.name]} name={props.name}
                       onChange={onChange}
                       className="px-4 py-1.5 text-sm rounded-md bg-white border border-gray-400 w-full outline-blue-500"/>
            </div>

        </>
    )
}
