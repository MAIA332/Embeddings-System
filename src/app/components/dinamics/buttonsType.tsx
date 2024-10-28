import Button from "../buttons/main"; 

const ButtonsType: React.FC<{ data: any[]; className: string }> = ({ data, className }) => {
    
    const handleButtonClick = (buttonText: string) => {
        const customEvent = new CustomEvent('buttonClicked', { detail: { text: buttonText } });
        document.dispatchEvent(customEvent);

        console.log(`Button clicked: ${buttonText}`);
    };

    return (
        <div className={`flex space-x-4 ${className}`}>
            {data.map((item, index) => (
                <Button key={index} onClick={()=>{handleButtonClick(item.text)}} variant="dark" className={`${item.className}`}>
                    {item.text}
                </Button>
            ))}
        </div>
    );
};

export default ButtonsType; 