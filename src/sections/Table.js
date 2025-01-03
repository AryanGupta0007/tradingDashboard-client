import React, {useEffect, useContext} from 'react';
import {TableRow} from '../components/TableRow.js';
import {TableContext} from '../contexts/TableContext.js'

export const Table = () => {
    const {symbols, tableState, generateData, updateData, getLtp} = useContext(TableContext)
    useEffect(() => {
        const runFirst = async () => {
            await generateData()
        }
        // const response = setInterval(() => {getLtp(tableState)}, 10000)
        runFirst()
        // return () => clearInterval(response)
    }, [])
    useEffect(()=>{
      console.log(tableState)

      const response = setInterval(() => {getLtp(tableState)}, 2000)
      return () => clearInterval(response)
  }, [tableState])
    if (tableState?.["ADANIENT"]?.["entry"]) {
        return (
            <div className="table-section">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead style={{color: 'white', backgroundColor: '#313233', position: 'sticky', top: 0, zIndex: 1}}>
                    <tr>
                        <th className="px-4 py-2 border-b">SYMBOL</th>
                        <th className="px-4 py-2 border-b">QTY</th>
                        <th className="px-4 py-2 border-b">TYPE</th>
                        <th className="px-4 py-2 border-b">ENTRY</th>
                        <th className="px-4 py-2 border-b">TARGET</th>
                        <th className="py-2 border-b">SL</th>
                        <th className="px-2 py-2 border-b">LTP</th>
                        <th className="px-6 py-2 border-b">ORDER ID</th>
                        <th className="px-2 py-2 border-b">ENTRY STATUS</th>
                        <th className="px-4 py-2 border-b">ENTRY PRICE</th>
                        <th className="px-4 py-2 border-b">EXIT ORDERID</th>
                        <th className="px-4 py-2 border-b">EXIT STATUS</th>
                        <th className="px-4 py-2 border-b">EXIT PRICE</th>
                        <th className="px-4 py-2 border-b">ACTIONS</th>
                    </tr>
                    </thead>
                    <tbody>
                    {symbols.slice().reverse().map((e, index) => (
                    e !== "undefined" ? <TableRow key={index} symbol={e} /> : null

                    ))}
                </tbody>
            </table>
    </div>
    )
        ;
    }
    ;

}
