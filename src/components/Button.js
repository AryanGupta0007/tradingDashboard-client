import {useContext, useEffect} from 'react'
import {FormContext} from '../contexts/FormContext.js'
import {TableContext} from '../contexts/TableContext.js'
export const Button = (props) => {
    const { title, type, move, color, marginRight} = props;
    const {formState, clearForm} = useContext(FormContext)
    const {tableState, setTableState, updateSymbols} = useContext(TableContext)
    const onClick = () => {
        if (title === "Order"){
            updateTable()
        }
        else if (title === "Cancel"){
            clearForm()
        }
    }
    const updateTable = () => {
        const data = {...formState}
        console.log(formState)
        const tableData = {...tableState}
        const keys = Object.keys(data)

        updateSymbols(data["symbol"])
        tableData[data["symbol"]] = {
            "qty": data["qty"] || "",
            "orderType": data["type"] || "",
            "entry": data["order_price"] || "",
            "target": data["target"] || "",
            "sl": data["sl"] || "",
            "entryStatus" :  "PENDING",
            "exitStatus" :  "PENDING"
        }
        console.log('data-table', tableData)
        setTableState(tableData)
        clearForm()
        console.log("updated")
    }


    const getBackgroundColor = () => {

        switch (title) {
            case 'Cancel':
                return 'bg-custom-yellow';
            case 'Order':
                return 'bg-aliceblue';
            default:
                return 'bg-purple';
        }
    };
    const getFontColor = () => {
        switch (title) {
            case 'Cancel':
                return 'custom-yellow';
            case 'Order':
                return 'blue';
            default:
                return 'purple';
        }
    };

    // Construct button class names
    const buttonClasses = `
        ${getFontColor()} 
        ${marginRight === 'true' ? "m-button-right": ""}
        button-size button-margin 
        px-5 py-2.5 rounded-lg 
        text-black text-sm tracking-wider 
        font-medium border border-current 
        outline-none active:bg-purple-700 
        ${type === 'smallButton' ? 'small-button' : ''} 
        ${type === 'mediumButton' ? 'medium-button' : ''} 
        ${move === 'true' ? 'move-button' : ''}
    `.trim();

    return (
        <div className="font-[sans-serif] space-x-4 space-y-4 text-center" style={{marginTop: "1vh"}}>
            <button type={props.type ? props.type : "button"}
               className={buttonClasses} style={{width: "7vw", height: "4vh", borderRadius: "0", marginTop: "1vh", paddingTop: "1vh"}}
            onClick={onClick}
            >
                {title}
            </button>
        </div>
    );
};


