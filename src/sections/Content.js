import {FormComp} from './FormComp.js';
import {Messages} from './Messages.js';
import {Button} from '../components/Button.js';
export const Content = (props) => {
    
    return (
        <div className="content flex" style={{height: "22vh"}}>
            <div className="formSection shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] rounded-lg flex">
                <div className="section-one" style={{width: "12vw", marginTop: "3vh"}}>
                    <FormComp type={"dropWithSearch"} title={"SYMBOL"} name={"symbol"}/>
                    <FormComp type={"input"} title={"ORDER PRICE"} name={"order_price"}/>
                </div>
                <div className="section-two" style={{width: "11vw", marginTop: "3vh"}}>
                    <FormComp type={"dropdown"} options={["BUY", "SELL"]} title={"TYPE"} name={"type"}/>
                    <FormComp type={"input"} title={"TARGET"} name={"target"}/>
                </div>
                <div className="section-three" style={{width: "12vw", marginTop: "3vh"}}>
                    <FormComp type={"input"} title={"QTY"} name={"qty"}/>
                    <FormComp type={"input"} title={"SL"} name={"sl"}/>
                </div>
                <div className="section-four" style={{width: "12vw", marginTop: "3vh"}}>
                    <Button  title={"Order"}/>
                    <Button title={"Cancel"} />
                </div>
            </div>
            <Messages/>
        </div>
    );
};
