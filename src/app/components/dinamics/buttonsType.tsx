import Button from "../buttons/main"; 

const ButtonsType: React.FC<{ data: any[]; className: string }> = ({ data, className }) => {
    return (
        <div className={`flex space-x-4 ${className}`}>
            {data.map((item, index) => (
                <Button key={index} variant="dark" className={`${item.className}`}>
                    {item.text}
                </Button>
            ))}
        </div>
    );
};

export default ButtonsType; 