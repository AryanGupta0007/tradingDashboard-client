import { useContext, useEffect } from 'react'
import { FormContext } from '../contexts/FormContext.js'
import { TableContext } from '../contexts/TableContext.js'

export const Button = (props) => {
    const { title, type, move, color, marginRight } = props;
    const { formState, clearForm } = useContext(FormContext)
    const {
        tableState,
        requestState,
        getSecurityId,
        setRequestState,
        setTableState,
        updateSymbols,
        subscribeState,
        setSubscribeState,
        messageState,
        setMessageState,
        addMessage,
        ltpState
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

    
    useEffect(() => {
        console.log("FormState: ", formState)
    }, [formState])

    const updateTable = async () => {
        const data = { ...formState }
        console.log("ye form aaya h", formState)
        // it takes place on editing a symbol
        if (data?.["id"]) {
            let currentRequestState = [...requestState]
            console.log("currentRequest", currentRequestState)
            const subscribeData = {}
            subscribeData[data["symbol"]] = {
                "qty": data["qty"] || "",
                "orderType": data["type"] || "",
                "entry": data["order_price"] || "",
                "target": data["target"] || "",
                "sl": data["sl"] || "",
                "id": data["id"],
                "securityId": data["securityId"]
            }
            // get all request states except the one being edited
            const otherRequests = currentRequestState.filter((f) => {
                const symbol = Object.keys(f)[0]
                // console.log(symbol)
                const key = f[symbol].id
                // console.log(key)
                return parseInt(key) !== parseInt(data['id'])
            })
            // console.log(otherRequests)
            const newRequestState = [...otherRequests, subscribeData]
            // console.log("edited Request State")
            const newMessage = { message: `edited order -> symbol ${data["symbol"]} ${data["qty"] || "null"} entry: ${data["order_price"] || "null"} target: ${data["target"] || "null"} sl: ${data["sl"] || "null"} type: ${data["type"]}` }
            await setRequestState(newRequestState)
            clearForm()
            await addMessage(newMessage)

            return

        }
        const subscribeData = {}
        let id;
        if (requestState.length === 0) {
            id = 1;
        }
        else {
            const prevElementSymbol = Object.keys(requestState[requestState.length - 1])[0]
            id = requestState[requestState.length - 1][prevElementSymbol]["id"] + 1
            // console.log(prevElementSymbol, id)
        }
        subscribeData[data["symbol"]] = {
            "qty": data["qty"] || "",
            "orderType": data["type"] || "",
            "entry": data["order_price"] || "",
            "target": data["target"] || "",
            "sl": data["sl"] || "",
            "id": id,
            "securityId": ""
        }
        // console.log('data-subscribe', subscribeData)
        const newMessage = { message: `added order -> symbol ${data["symbol"]} qty: ${data["qty"] || "null"} entry: ${data["order_price"] || "null"} target: ${data["target"] || "null"} sl: ${data["sl"] || "null"} type: ${data["type"]}` }
        await getSecurityId(subscribeData)
        clearForm()
        try{
            await addMessage(newMessage)

        }
        catch(error){
            try{
                await addMessage(newMessage)
            }
            catch(error){
                try{
                    await addMessage(newMessage)
                }
                catch(error){
                    console.log('unable to add message')
                }
                

            }
        }
        
        // console.log("updated")
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
    const isDisabled = () => {
        // console.log(formState)
        if (!formState["symbol"] || formState["symbol"].trim() === "") {
            return true;
          }
          // If id is undefined, then check if "SBIN" exists in ltpState
          if (formState["id"] === undefined) {
            const symbolToCheck = formState["symbol"];
            const exists = ltpState.some(item => item.hasOwnProperty(symbolToCheck));
            console.log("SBIN exists in ltpState:", exists);
            return exists;
          }
          // Otherwise, the button should not be disabled
          return false;

    }

    const disabledClasses = isDisabled() ? "opacity-50 cursor-not-allowed" : "";
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
        ${disabledClasses}
    `.trim();

    return (
        <div className="font-[sans-serif] space-x-4 space-y-4 text-center" style={{ marginTop: "1vh" }}>
            <button type={props.type ? props.type : "button"}
                className={buttonClasses}
                style={{ width: "7vw", height: "4vh", borderRadius: "0", marginTop: "1vh", paddingTop: "1vh" }}
                onClick={onClick}
                disabled={isDisabled()}
            >
                {title}
            </button>
        </div>
    );
};


