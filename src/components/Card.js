import React from "react";

export const Card = (props) => {
    const {color, title, price, target, percentageFont, font, percentage} = props
    const getBorder = (color) => {
        return `2px solid blue`
    }
    const getFont = (color) => {
        return `${color}`
    }
    return (
        <>
            <div style={{
                border: getBorder(color),
                width: "15vw", height: "9vh", "margin-left": "1vw",
                "margin-top": "3vh"
            }}
                 className="card bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] rounded-lg font-[sans-serif] overflow-hidden">
                <div>
                    <div className="top flex">
                        <div style={{width: "30%"}}>
                            <h6 className="text-lg font-bold" style={{marginLeft: "5vw"}}>{title}</h6>
                        </div>
                    </div>
                    <div className={"flex"}>
                        <div style={{width: "50%"}}>
                            <h6 className="text-lg font-light"
                                style={{color: getFont(font)}}
                            >{price}</h6>
                        </div>
                        <div style={{width: "50%"}}>
                            <h6 className="text-lg font-light"
                                style={{color: getFont(percentageFont)}}
                            >{`(${percentage}%)`}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}
