import {LongButton} from '../components/LongButton.js'
import React, {useState, useEffect, useContext} from 'react';
export const Footer = (props) => {
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setDateTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, [])


    return (
        <>
            <div className="footer">
                <div className="flex">
                    <div className="sec1 sec" style={{width: "50vw", height: "5vh"}}>
                        <LongButton title={"Start"} color={"white"}/>
                    </div>
                    <div className="sec2 sec" style={{width: "50vw", height: "5vh"}}>
                        <LongButton title={"Stop"} color={"white"}/>
                    </div>
                </div>
                <div className="flex justify-center" style={{width: "100vw", height: "3vh",
                position: "absolute", bottom: "-1vh"
                }}>
                    <h2 style={{marginRight: "2vw"}}>{dateTime.toLocaleString()}</h2>
                    <h2 style={{marginRight: "2vw"}}>Running: 64682.23 </h2>
                    <h2 style={{marginRight: "2vw"}}>Booked: 1,863.75</h2>
                    <h2 style={{marginRight: "2vw"}}> Total: 15,828.75(0.33%)</h2>
                    <h2 style={{marginRight: "2vw"}}>Utilized fund: 4,849,003.21 </h2>
                    <h2 style={{marginRight: "2vw"}}> Available fund: 195,150,996.79 (2.48%)</h2>
                </div>

            </div>
        </>
    )
}
