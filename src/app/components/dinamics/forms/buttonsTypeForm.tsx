import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Importa a função v4 para gerar UUIDs

const ButtonsTypeForm = ({ onChange }: { onChange: (data: { id: string; className: string; text: string }[]) => void }) => {
    const [buttons, setButtons] = useState<{ id: string; className: string; text: string }[]>([]);
    const [elementQuantity, setElementQuantity] = useState<number>(1);

    useEffect(() => {
        const newButtons = Array.from({ length: elementQuantity }, () => ({
            id: uuidv4(), 
            text: '',
            className: ''
        }));
        setButtons(newButtons);
    }, [elementQuantity]);

    useEffect(() => {
        onChange(buttons);
        localStorage.setItem("componentRenderData", JSON.stringify(buttons));
    }, [buttons, onChange]);

    const handleNameChange = (index: number, value: string) => {
        const updatedButtons = [...buttons];
        updatedButtons[index].text = value;
        setButtons(updatedButtons);
    };

    const handleColorChange = (index: number, value: string) => {
        const updatedButtons = [...buttons];
        const classNameMap: any = {
            "dark": "bg-black text-white py-2 px-4 rounded-md",
            "light": "bg-white text-slate-900 hover:bg-slate-300 border border-black py-2 px-4 rounded-md"
        };

        updatedButtons[index].className = classNameMap[value] || '';
        setButtons(updatedButtons);
    };

    return (
        <div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Quantidade de botões:</label>
                <input 
                    type='number' 
                    min={1}
                    onChange={(e) => setElementQuantity(Number(e.target.value))}
                    value={elementQuantity} 
                    name='quantity' 
                    id='quantity' 
                    className='w-full border rounded p-2 bg-black ' 
                    placeholder='Quantidade de botões'
                />
            </div>

            {buttons.map((button, index) => (
                <div key={button.id}> {/* Use o id como chave */}
                    <h1 className='mt-10'>Botão {`${index + 1}`}</h1>
                    <label className="block text-sm font-medium mb-1">Nome do botão {`${index + 1}`}:</label>
                    <input 
                        type='text' 
                        onChange={(e) => handleNameChange(index, e.target.value)}
                        value={button.text} 
                        name={`name-${index}`} 
                        className='w-full border rounded p-2 bg-black' 
                        placeholder='Digite o nome do botão'
                    />
                    <label className="block text-sm font-medium mb-1 mt-2">Variação do botão:</label>
                    <select
                        value={button.className ? (button.className.includes('bg-black') ? 'dark' : 'light') : ''}
                        onChange={(e) => handleColorChange(index, e.target.value)}
                        className="w-full border rounded p-2 bg-black"
                    >
                        <option key="Selecione um tipo" value="">Selecione um tipo</option>
                        <option key="light" value="light">Claro</option>
                        <option key="dark" value="dark">Escuro</option>
                    </select>
                </div>
            ))}
        </div>
    );
};

export default ButtonsTypeForm;