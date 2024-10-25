const ButtonsType: React.FC<{ data: any[],className:string }> = ({ data,className }) => {
    return (
        <div className={`flex space-x-4 ${className}`}>
            {data.map((item, index) => (
                <button key={index} className={item.className}>
                    {item.text}
                </button>
            ))}
        </div>
    );
};

export default ButtonsType;