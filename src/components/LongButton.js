export const LongButton = (props) => {
    const { title, type, move, color, marginRight } = props
    const getBackgroundColor = () => {

        switch (color) {
            case 'red':
                return 'bg-red hover:bg-red-800'
            case 'white':
                return 'bg-white'
            case 'green':
                return 'bg-green hover:bg-green-800'
            case 'black':
                return 'bg-black hover:bg-black-800'
            default:
                return 'bg-purple hover:bg-aliceblue-800'
        }
    }
    const buttonClasses = `
        ${getBackgroundColor()} 
        ${marginRight === 'true' ? "m-button-right": ""}
        button-size button-margin 
        rounded-lg 
        text-black text-sm tracking-wider 
        font-medium border border-current 
        outline-none active:bg-purple-700 
        ${type === 'smallButton' ? 'small-button' : ''} 
        ${type === 'mediumButton' ? 'medium-button' : ''} 
        ${move === 'true' ? 'move-button' : ''}
    `.trim();

    return (
        <div className="long-button font-[sans-serif]  text-center" >
            <button type="button" className={buttonClasses} style={{"border-radius": "0",
            "width": "100%", height: "100%"}}>
                {title}
            </button>
        </div>
    );
};
