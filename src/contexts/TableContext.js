import {createContext, useState} from 'react'

export const TableContext = createContext();
export const TableState = (props) => {
    const [tableState, setTableState] = useState({})
    const [requestState, setRequestState] = useState([])
    const [subscribeState, setSubscribeState] = useState({})
    const [symbols, setSymbols] = useState([
        "ADANIENT",
        "ADANIGREEN",
        "WIPRO"
    ])
    const updateSymbols = (symbol) => {
        const current = [...symbols]
        if (!current.includes(symbol)) {
            current.push(symbol)

        }
        console.log(current)
        setSymbols(current)
    }
    const status = ['PENDING', 'ACTIVE', 'COMPLETED']
    const getRandomPrice = (start, difference) => {
        const price = Math.round((Math.random() * difference) + start) / 100
        return price
    }
    const getSecurityId = async(data) => {
        console.log("subscribing ", data)
        let response = await fetch("http://127.0.0.1:5001/getSecurityKey",
            {
                method: "POST",
                headers:{
                    "content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
        let finalResponse = await response.json()

        console.log("subscribed ", finalResponse)
        const newRequestState = [...requestState, finalResponse]
        setRequestState(newRequestState)
        return finalResponse
    }

    const getLtp = async (data) => {
        try {
            console.log("Fetching data...")
            console.log("sending this data ", data)
            const response = await fetch("http://127.0.0.1:5001/ltp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Received response:", result);
            setTableState(result);
            return result;
        } catch (error) {
            console.error("Error in fetching data:", error);
        }
    };

    const orderTypes = ['BUY', 'SELL']
    const randomInt = (gap, start) => {
        return Math.round((Math.random() * (gap)) + start)
    }
    const getTargetPrice = (price) => {
        const target = parseFloat(price) + 100
        return target
    }


    const updateData = async () => {
        const data = {...tableState}
        // symbols.map((e) => {
        //
        //     // data[e]["ltp"]= getRandomPrice(1000, 200000).toFixed(2)
        //     // data[e]["ltp"]= getLtp({symbol: e})
        //     // data[e]["entryPrice"]= getRandomPrice(1000, 2000)
        //     // data[e]["entryId"] =  randomInt(99999, 100000)
        //     // data[e]["orderId"] =  randomInt(99999, 100000)
        //     // data[e]["exitOrderId"] =  randomInt(99999, 100000)
        //     // data[e]["exitPrice"] =  getRandomPrice(1000, 2000)
        //     // data[e]["entryStatus"] =  status[randomInt(2, 0)]
        //     // data[e]["exitStatus"] =  status[randomInt(2, 0)]
        // })
        // await setTableState(data)

    }
    const generateData = async () => {
        const data = {}
        symbols.map((e) => {
            data[e] = {}
            data[e]["qty"] = (randomInt(2, 1)) * 25
            data[e]["orderType"] = orderTypes[randomInt(1, 0)]
            data[e]["entry"] = getRandomPrice(1000, 200000).toFixed(2)
            data[e]["target"] = getTargetPrice(data[e]["entry"]).toFixed(2)
            data[e]["sl"] = (data[e]["entry"] - 70).toFixed(2)
            data[e]["ltp"] = ""
            data[e]["entryPrice"] = ""
            data[e]["entryId"] = ""
            data[e]["orderId"] = ""
            data[e]["exitOrderId"] = ""
            data[e]["exitPrice"] = ""
            data[e]["entryStatus"] = ""
            data[e]["exitStatus"] = ""
            // data[e]["id"] = tableState.keys().length()
        })
        await setTableState(data)
        await setRequestState(data)
    }

    return <TableContext.Provider
        value={{tableState, getSecurityId, generateData, symbols, updateData, setTableState, updateSymbols, setSymbols, getLtp, requestState, setRequestState, subscribeState, setSubscribeState}}>
        {props.children}
    </TableContext.Provider>
}