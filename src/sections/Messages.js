import React, {useContext} from 'react'
import { TableContext } from '../contexts/TableContext';

export const Messages = () => {
    const {messageState} = useContext(TableContext)
    return (
        <>
            <div
                className="messages rounded-lg"
                style={{
                    "margin-left": "2vw",
                    border: "2px solid blue",
                    height: "23vh",
                    overflowY: "auto",
                    overflowX: "hidden",
                    position: "relative",
                    width: "55vw"
                }}
            >
                <div style={{width: "45vw", height: "2vh"}}>
                    <h1 style={{"font-size": "1.25rem", "color": "red"}}>Messages</h1>
                </div>
                <div style={{height: "18vh", marginTop: "2vh"}}>
                    <ul style={{}}>
                        {messageState.slice().reverse().map((e, index) => {
                            return <li key={index}>{e}</li>;
                        })}
                    </ul>
                </div>
            </div>
        </>

    )
}
