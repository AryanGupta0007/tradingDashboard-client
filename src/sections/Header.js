import {useContext, useEffect} from 'react'
import {Card} from '../components/Card.js'
import {MarketWatchContext} from '../contexts/MarketWatchContext.js'

export const Header = (props) => {
    const colors = ["green", "blue", "brown", "black", "green", "blue"]
    const {getPrice, marketWatch, price} = useContext(MarketWatchContext)
    useEffect(() => {
        const run = setInterval(() => {
            getPrice()
        }, 1000)
        return () => clearInterval(run)
    }, [price])

    // useEffect(() => {
    //     console.log(price)
    // }, [price])

    if (price?.["BANKNIFTY"]?.["price"]) {
        return (
            <>
                <div className="header flex justify-center">
                    {
                        marketWatch.map((e, index) => {
                            return (
                                <Card color={colors[index]} target={price[e]["target"]} price={price[e]["price"]}
                                  percentage={price[e]["percentage"]} title={e} font={price[e]["colorPrice"]} percentageFont={price[e]["color"]}/>
                                )

                        })}


                </div>
            </>
        )

    }


}