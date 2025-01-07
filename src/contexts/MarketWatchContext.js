import {createContext, useState} from 'react'

export const MarketWatchContext = createContext()
export const MarketWatchState = (props) => {
    const marketWatch = ['NIFTY', 'SENSEX', 'BANKNIFTY', 'FINNIFTY', 'MIDCPNIFTY']
    const [price, setPrice] = useState({})
    const fetchMarketPrice = async () => {
        const response = await fetch("http://127.0.0.1:5001/index", {
            method: "GET",
            headers: {
                "content-Type": "application/json",
            }
        })
        const finalResponse = await response.json()
        return finalResponse


    }
    const getPriceFontColor = (currentPrice, prevPrice) => {
        prevPrice = parseFloat(prevPrice)
        // console.log(prevPrice)
        if (currentPrice > prevPrice) {
            return "green"
        }
        return "red"
    }
    const getPrice = async (symbol) => {
        const data = {...price};
        const response = await fetchMarketPrice()
        let currentPrice, prevDayClose, fontColor;
        marketWatch.forEach((e) => {
            if (!data?.[e]?.["price"]) {
                data[e] = {}
                data[e]["price"] = response[e]["prevDayClose"]
            }
            currentPrice = response[e]["currentValue"];
            prevDayClose = response[e]["prevDayClose"];
            if ((parseInt(response[e]["percentageDifference"])) > 0) {
                fontColor = "green";
            } else {
                response[e]["percentageDifference"] *= -1
                fontColor = "red";
            }
            data[e]["percentage"] = response[e]["percentageDifference"].toFixed(2)
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