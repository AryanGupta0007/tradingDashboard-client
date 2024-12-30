import {INPUT} from '../components/INPUT.js'
import {Label} from '../components/Label.js'
import {Dropdown} from '../components/Dropdown.js'

export const FormComp = (props) => {
    const {type, title} = props
    const renderComponent = (type) => {
        if (type === "input") {
            return (
                <>
                    <INPUT name={props.name}/>
                </>)
        } else if (type === "dropdown") {
            return (
                <>
                    <Dropdown options={props.options} name={props.name}/>

                </>)
        }
    }
    return (
        <>
            <div className={"formCompDiv flex"} style={{position: "relative", top: "0.5vh", width: "12vw"}}>
                <Label title={title}/>
                {renderComponent(type)}
            </div>

        </>
    )
}
