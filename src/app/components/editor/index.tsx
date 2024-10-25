// pages/editor.tsx

import { useState } from 'react';

const EditorPage: React.FC = () => {
    const [code, setCode] = useState<string>('<h1>Olá, Mundo!</h1>');

    const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCode(event.target.value);
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/2 p-4 border-r border-gray-300">
                <h2 className="text-xl font-bold mb-2">Editor</h2>
                <textarea
                    value={code}
                    onChange={handleCodeChange}
                    className="w-full h-5/6 border rounded p-2 font-mono text-lg resize-none text-slate-950"
                    placeholder="Escreva seu código HTML aqui..."
                />
            </div>
            <div className="w-1/2 p-4 bg-white">
                <h2 className="text-xl font-bold mb-2 text-slate-950">Preview</h2>
                <iframe
                    style={{ width: '100%', height: '90%', border: 'none' }}
                    srcDoc={code}
                />
            </div>
        </div>
    );
};

export default EditorPage;