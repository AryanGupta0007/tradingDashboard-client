import {createContext, useState} from 'react'

export const MarketWatchContext = createContext()
export const MarketWatchState = (props) => {
    const marketWatch = ['NIFTY', 'SENSEX', 'BANKNIFTY', 'BANKEX', 'FINNIFTY', 'MIDCPNIFTY']
    const getPriceFontColor = (currentPrice, prevPrice) => {
        prevPrice = parseFloat(prevPrice)
        // console.log(prevPrice)
        if (currentPrice > prevPrice) {
            return "green"
        }
        return "red"
    }
    const [price, setPrice] = useState({})
const getPrice = async (symbol) => {
    const data = {...price};
    let currentPrice, prevDayClose, currentDiff, fontColor;

    marketWatch.forEach((e) => {
        if (!data?.[e]?.["price"]) {
            data[e] = {}
            data[e]["price"] = 0
        }

        if (e === "BANKNIFTY") {
            currentPrice = (Math.random() * 5000) + 50000;
            prevDayClose = 52500;
        } else if (e === "SENSEX") {
            currentPrice = (Math.random() * 5000) + 80000;
            prevDayClose = 82500;
        } else {
            currentPrice = (Math.random() * 5000) + 40000;
            prevDayClose = 42500;
        }

        if (currentPrice > prevDayClose) {
            currentDiff = currentPrice - prevDayClose;
            fontColor = "green";
        } else {
            currentDiff = prevDayClose - currentPrice;
            fontColor = "red";
        }

        data[e]["percentage"] = ((currentDiff / prevDayClose) * 100).toFixed(2);
        data[e]["color"] = fontColor;

        // Use currentPrice instead of prevPrice directly here
        data[e]["prevPrice"] = data[e]["price"]
        const localPrevPrice = data[e]["prevPrice"]
        data[e]["colorPrice"] = getPriceFontColor(currentPrice, localPrevPrice);

        data[e]["price"] = currentPrice.toFixed(2);
    });

    setPrice(data);
};

    return (
        <MarketWatchContext.Provider value={{getPrice, price, marketWatch}}>
            {props.children}
        </MarketWatchContext.Provider>
    )


}