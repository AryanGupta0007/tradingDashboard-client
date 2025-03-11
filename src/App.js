import {useEffect, useContext} from 'react'
import './App.css';
import './utils.css'
import './sections.css'
import './components.css'
import {Header} from './sections/Header.js'
import {Content} from './sections/Content.js'
import {Table} from './sections/Table.js'
import {Footer} from './sections/Footer.js'
import {TableState} from './contexts/TableContext.js'
import {MarketWatchState} from './contexts/MarketWatchContext.js'
import {FormState} from './contexts/FormContext.js'
function App() {
    return (
        <TableState>
            <MarketWatchState>
                <FormState>
                    <div className="App poppins-regular">
                        <Header/>
                        <Table/>
                        <Content/>
                        <Footer/>
                    </div>
                </FormState>
            </MarketWatchState>
        </TableState>
    )
}

export default App;
