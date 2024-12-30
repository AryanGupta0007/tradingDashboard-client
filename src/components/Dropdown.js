import {useContext, useEffect} from 'react'
import {FormContext} from '../contexts/FormContext.js'
export const Dropdown = (props) => {
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
        <div className="dropdown  relative font-[sans-serif] w-max">
            <select
                id="currency"
                value={formState["type"] || "BUY"}
                name={props.name}
                onChange={onChange}
                className="mt-2 block w-full  border border-gray-300 bg-white py-1.5 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm correct-label-dropdown"
            >
                {props.options.map((e, index) => {
                    return (
                        <option key={index} value={e}>
                            {e}
                        </option>
                    );
                })}
            </select>
        </div>


    )

}

Dropdown.defaultProps = {
    options: ['A', 'B']
}