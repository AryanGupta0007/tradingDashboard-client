// TODO : multiple entries with same symbol
// TODO: return rows based on tableState


import React, { useContext, useEffect } from "react";
import { TableContext } from "../contexts/TableContext.js";
import { FormContext } from "../contexts/FormContext.js";

export const TableRow = (props) => {
    const { e } = props
    const id = e[props.symbol]["id"]
    const {
        tableState,
        updateData,
        requestState,
        setRequestState,
        symbols,
        setSymbols,
        getLtp,
        setTableState,
        ltpState,
        orderState,
        messageState,
        addMessage
    } = useContext(TableContext);
    const { editForm, clearForm } = useContext(FormContext);
    // console.log("ew ", props.symbol, e, e[props.symbol]["qty"])

    const onClickEdit = () => {
        clearForm()
        const newState = {
            "symbol": props.symbol,
            "qty": e[props.symbol]["qty"],
            "type": e[props.symbol]["orderType"],
            "order_price": e[props.symbol]["entry"],
            "target": e[props.symbol]["target"],
            "sl": e[props.symbol]["sl"],
            "securityId": e[props.symbol]["securityId"],
            "id": e[props.symbol]["id"]
        }

        // console.log("editForm", newState)
        editForm(newState)
    }
    const onClickDelete = async () => {
        console.log("clicked delete")
        const symbol = props.symbol
        // console.log(symbol)
        let currentRequestState = [...requestState]
        // console.log("currentTable", currentTableState)
        currentRequestState = currentRequestState.filter((f) => {
            const key = Object.keys(f)[0]
            const fid = f[key].id
            console.log('fkey ', fid)
            return parseInt(fid) !== parseInt(id)
        })
        const newMessage = {message: `deleted order -> symbol ${symbol}`}    
        await setRequestState(currentRequestState)
        // console.log("NewcurrentTable", currentRequestState)
        await addMessage(newMessage)

    }
    useEffect(() => {
        console.log("table state updated ", tableState)
    }, [tableState])
    const getBackgroundColor = (exitStatus) => {
        if (exitStatus === "COMPLETED") {
            return "silver"
        } else if (exitStatus === "PENDING") {
            return "aliceblue"
        } else if (exitStatus === "ACTIVE") {
            return "white"
        }
    }
    const getColor = (orderType) => {
        if (orderType === "BUY") {
            return "#333333"
        } else if (orderType === "SELL") {
            return "#6A0DAD"
        }
    }
    return (
        <>
            <tr style={{
                color: getColor(e[props.symbol]["orderType"]),
                backgroundColor: getBackgroundColor(e[props.symbol]["exitStatus"])
            }}>
                <td className="border-b"
                    style={{ textAlign: "left", position: "relative", left: "1.2vw" }}>{props.symbol}</td>
                <td className=" border-b">{e[props.symbol]["qty"]}</td>
                <td className=" border-b">{e[props.symbol]["orderType"]}</td>
                <td className=" border-b">{e[props.symbol]["entry"] !== undefined && !isNaN(e[props.symbol]["entry"])
                        ? Number(e[props.symbol]["entry"]).toFixed(2)
                        : ""}</td>
                <td className=" border-b">
                    {e[props.symbol]["target"] !== undefined && !isNaN(e[props.symbol]["target"])
                        ? Number(e[props.symbol]["target"]).toFixed(2)
                        : ""}
                </td>
                <td className=" border-b px-4">
                    {e[props.symbol]["sl"] !== undefined && !isNaN(e[props.symbol]["sl"])
                        ? Number(e[props.symbol]["sl"]).toFixed(2)
                        : ""}
                </td>
                <td className="border-b">
                    {Array.isArray(ltpState)
                        ? (() => {
                            const ltp = ltpState.find(item => item[props.symbol])?.[props.symbol]?.ltp;
                            return ltp !== undefined && !isNaN(ltp)
                                ? Number(ltp).toFixed(2)
                                : "";
                        })()
                        : ""}
                </td>
                <td className="border-b px-4">
                    {Array.isArray(orderState)
                        ? orderState.find(item => item[props.symbol])?.[props.symbol]?.entryId || ""
                        : ""}
                </td>
                <td className="border-b">
                    {Array.isArray(orderState)
                        ? orderState.find(item => item[props.symbol])?.[props.symbol]?.entryStatus || ""
                        : ""}
                </td>
                <td className="border-b">
                    {Array.isArray(orderState)
                        ? (() => {
                            const price = orderState.find(item => item[props.symbol])?.[props.symbol]?.entryPrice;
                            return price !== undefined && !isNaN(price) ? Number(price).toFixed(2) : "";
                        })()
                        : ""}
                </td>
                <td className="border-b">
                    {Array.isArray(orderState)
                        ? orderState.find(item => item[props.symbol])?.[props.symbol]?.exitOrderID || ""
                        : ""}
                </td>
                <td className="border-b">
                    {Array.isArray(orderState)
                        ? orderState.find(item => item[props.symbol])?.[props.symbol]?.exitStatus || ""
                        : ""}
                </td>
                <td className="border-b">
                    {Array.isArray(orderState)
                        ? (() => {
                            const price = orderState.find(item => item[props.symbol])?.[props.symbol]?.exitPrice;
                            return price !== undefined && !isNaN(price) ? Number(price).toFixed(2) : "";
                        })()
                        : ""}
                </td>
                <td className=" border-b">
                    <button className="mr-4" title="Edit" onClick={onClickEdit}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="w-5 fill-blue-500 hover:fill-blue-700"
                            viewBox="0 0 348.882 348.882">
                            <path
                                d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z"
                                data-original="#000000" />
                            <path
                                d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
                                data-original="#000000" />
                        </svg>
                    </button>
                    <button className="mr-4" title="Delete" onClick={onClickDelete}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-red-500 hover:fill-red-700"
                            viewBox="0 0 24 24">
                            <path
                                d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                data-original="#000000" />
                            <path
                                d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                data-original="#000000" />
                        </svg>
                    </button>
                </td>
            </tr>
        </>
    )

};
