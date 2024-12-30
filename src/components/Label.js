import React from "react";
export const Label = (props) => {
    const {title} = props
    const getDistanceFromTop = () => {
        if (title === "ORDER PRICE"){
            return "-1vh"
        }
        return "1vh"
    }
    return (
        <>
            <div className="label">
                <label style={{position: "relative", top: getDistanceFromTop()}}
                       className="block text-sm font-medium leading-6 text-gray-900 correct-label">{title}</label>
            </div>
        </>
    )
}

