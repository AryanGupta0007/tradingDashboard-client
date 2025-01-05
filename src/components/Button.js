import {useContext, useEffect} from 'react'
import {FormContext} from '../contexts/FormContext.js'
import {TableContext} from '../contexts/TableContext.js'

export const Button = (props) => {
    const {title, type, move, color, marginRight} = props;
    const {formState, clearForm} = useContext(FormContext)
    const {
        tableState,
        requestState,
        getSecurityId,
        setRequestState,
        setTableState,
        updateSymbols,
        subscribeState,
        setSubscribeState
    } = useContext(TableContext)
    const onClick = () => {
        if (title === "Order") {
            updateTable()
        } else if (title === "Cancel") {
            clearForm()
        }
    }
    useEffect(() => {
        console.log("SubscribeState: ", subscribeState)
    }, [subscribeState])

    const updateTable = async () => {
        const data = {...formState}
        console.log("ye form aaya h", formState)
        if (data?.["id"]) {
            let currentRequestState = [...requestState]
            console.log("currentTable", currentRequestState)
            const subscribeData = {}
            subscribeData[data["symbol"]] = {
                "qty": data["qty"] || "",
                "orderType": data["type"] || "",
                "entry": data["order_price"] || "",
                "target": data["target"] || "",
                "sl": data["sl"] || "",
                "ltp": "",
                "entryId": "",
                "exitOrderId": "",
                "entryPrice": "",
                "exitPrice": "",
                "entryStatus": "",
                "exitStatus": "",
                "id": data["id"],
                "securityId": data["securityId"]
            }
            currentRequestState = currentRequestState.filter((f) => {
                const key = Object.keys(f)[0]
                const fid = f[key].id
                console.log('fkey ', fid)
                return parseInt(fid) !== parseInt(data['id'])
            })
            currentRequestState = [...currentRequestState, subscribeData]
            console.log("edited Request State")
            await setRequestState(currentRequestState)
            clearForm()
            return

        }
        const subscribeData = {}

        const id = () => {
            let arrayLen = tableState.length
            if (arrayLen > 0) {
                const lastElement = tableState[arrayLen - 1]
                const lastKey = Object.keys(lastElement)[0];  // Get the key of the last object
                const id = lastElement[lastKey].id;
                return parseInt(id) + 1
            }
        }

        subscribeData[data["symbol"]] = {
            "qty": data["qty"] || "",
            "orderType": data["type"] || "",
            "entry": data["order_price"] || "",
            "target": data["target"] || "",
            "sl": data["sl"] || "",
            "ltp": "",
            "entryId": "",
            "exitOrderId": "",
            "entryPrice": "",
            "exitPrice": "",
            "entryStatus": "",
            "exitStatus": "",
            "id": requestState.length + 1
        }
        console.log('data-subscribe', subscribeData)
        await getSecurityId(subscribeData)
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
        ${marginRight === 'true' ? "m-button-right" : ""}
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
                    className={buttonClasses}
                    style={{width: "7vw", height: "4vh", borderRadius: "0", marginTop: "1vh", paddingTop: "1vh"}}
                    onClick={onClick}
            >
                {title}
            </button>
        </div>
    );
};


