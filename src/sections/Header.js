import {useContext, useEffect} from 'react'
import {Card} from '../components/Card.js'
import {MarketWatchContext} from '../contexts/MarketWatchContext.js'
import { TableContext } from '../contexts/TableContext.js'

export const Header = (props) => {
    const colors = ["green", "blue", "brown", "black", "green", "blue"]
    const {getMessages, messages} = useContext(TableContext)
    const {getPrice, marketWatch, price} = useContext(MarketWatchContext)
    useEffect(() => {
        const run = setInterval(() => {
            getPrice()
        }, 1000)
        return () => clearInterval(run)
    }, [price])
    useEffect(() => {
        const run = setInterval(() => {
            getMessages()
        }, 3000)
        return () => clearInterval(run)
    }, [messages])


    useEffect(()=>{
        // console.log(price)
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
                                <Card color={colors[index]} target={price[e]["target"]} price={price[e]["price"]} key={index}
                                  percentage={price[e]["percentage"]} title={e} font={price[e]["colorPrice"]} percentageFont={price[e]["color"]}/>
                                )

                        })}


                </div>
            </>
        )

    }


}