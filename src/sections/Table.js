import React, { useEffect, useContext } from 'react';
import { TableRow } from '../components/TableRow.js';
import { TableContext } from '../contexts/TableContext.js';

export const Table = () => {
    const {
        symbols,
        tableState,
        setRequestState,
        requestState,
        generateData,
        updateData,
        getLtp,
        placeOrder
    } = useContext(TableContext);

    useEffect(() => {
        console.log('updatedRequestState', requestState);
    }, [requestState]);

    useEffect(() => {
        console.log(requestState);

        const response = setInterval(() => {
            getLtp(requestState);
        }, 2000);
        return () => clearInterval(response);
    }, [requestState]);

    useEffect(() => {
        console.log("ordering", tableState);
        try{
        const response = setInterval(() => {
            placeOrder(tableState);
        }, 2000);
        return () => clearInterval(response);
        }
        catch(error){
            console.log(error)
        }
    }, [tableState]);

    if (Array.isArray(tableState) && tableState.length >= 1) {
        return (
            <div className="table-section">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead
                        style={{
                            color: 'white',
                            backgroundColor: '#313233',
                            position: 'sticky',
                            top: 0,
                            zIndex: 1,
                        }}
                    >
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
                        {tableState.map((e, index) => {
                            // Check if e is an object and not empty
                            if (e && typeof e === 'object' && Object.keys(e).length > 0) {
                                console.log("e: ", e)
                                const symbol = Object.keys(e)[0];
                                return <TableRow key={index} e={e} symbol={symbol} />;
                            }
                            return null; // Return null if e is invalid
                        })}
                    </tbody>
                </table>
            </div>
        );
    } else {
        return <div>No data available.</div>; // Optionally show a message when tableState is empty or invalid
    }
};
