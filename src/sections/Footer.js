import { LongButton } from '../components/LongButton.js'
import React, { useState, useEffect, useContext, useRef } from 'react';
import { TableContext } from '../contexts/TableContext.js';
import { socket } from '../socket.js'
export const Footer = (props) => {
    const [dateTime, setDateTime] = useState(new Date());
    const {
        symbols,
        tableState,
        setRequestState,
        setLtpState,
        setOrderState,
        requestState,
        generateData,
        updateData,
        getLtp,
        placeOrder,
        ltpState,
        orderState,
        setTableState,
        messageState,
        setMessageState,
        getSecurityId
    } = useContext(TableContext);
    const isLtpStarted = useRef(false);
    useEffect(() => {
        const interval = setInterval(() => {
            setDateTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, [])
    const onStart = () => {
        console.log('start is pressed')
        if (!socket.connected) {
            socket.connect();
        }
    }
    const onStop = () => {
        console.log('stop pressed')
        if (socket.connected) {
            console.log('socket disconnected', socket)
            socket.disconnect();
        }
        // Ensures cleanup on unmount
    }



    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
        }

        const onConnect = () => {
            console.log("connected");
        };

        socket.on("connect", onConnect);
    
    socket.on('message', async (data) => {
        console.log(`msg recieved `, data)
        const { requestState, orderState } = data

        setRequestState(requestState)
        setOrderState(orderState)
        console.log('connected to server')
        setTimeout(() => {
            console.log('Emitting startLtp with:', requestState);
            socket.emit('startLtp', { requestState, ltpState, orderState });
            isLtpStarted.current = true; // Prevent re-emission

        }, 10000)
    })
    socket.on('ltpUpdate', (data) => {
        // console.log(data)
        // console.log("recieLTP", data.ltpState)
        // console.log(ltpState)
        setLtpState(data.ltpState);
        // setLtpState(data)
    })
    socket.on('orderExecuted', (data) => {
        // console.log("order recieved", data)
        setOrderState(data)
    })

    return () => {
        socket.off("connect", onConnect); // Cleanup listener
        socket.disconnect();
    };

}, [])

    useEffect(() => {
        console.log('updatedRequestState', requestState);
        console.log('emitting request state update')
        // Restart LTP process if requestState is updated
        if (requestState.length > 0 && isLtpStarted.current === true) {
            socket.emit('updateRequestState', requestState);
            console.log('Re-emitting startLtp due to requestState change', requestState);
            socket.emit('startLtp', { requestState, ltpState, orderState });
        }
    }, [requestState]);

useEffect(() => {
    // console.log("messageState: ", messageState)
    socket.emit('updateMessageState', messageState);
}, [messageState])

return (
    <>
        <div className="footer">
            <div className="flex">
                <div className="sec1 sec" style={{ width: "50vw", height: "5vh" }}>
                    <LongButton title={"Start"} color={"white"} onClick={onStart} />
                </div>
                <div className="sec2 sec" style={{ width: "50vw", height: "5vh" }}>
                    <LongButton title={"Stop"} color={"white"} onClick={onStop} />
                </div>
            </div>
            <div className="flex justify-center" style={{
                width: "100vw", height: "3vh",
                position: "absolute", bottom: "-1vh"
            }}>
                <h2 style={{ marginRight: "2vw" }}>{dateTime.toLocaleString()}</h2>
                <h2 style={{ marginRight: "2vw" }}>Running: 64682.23 </h2>
                <h2 style={{ marginRight: "2vw" }}>Booked: 1,863.75</h2>
                <h2 style={{ marginRight: "2vw" }}> Total: 15,828.75(0.33%)</h2>
                <h2 style={{ marginRight: "2vw" }}>Utilized fund: 4,849,003.21 </h2>
                <h2 style={{ marginRight: "2vw" }}> Available fund: 195,150,996.79 (2.48%)</h2>
            </div>

        </div>
    </>
)
}
