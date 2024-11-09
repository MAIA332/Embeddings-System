import { useState, useEffect} from 'react';
import ButtonsType from '../dinamics/buttonsType';
import ButtonsTypeForm from '../dinamics/forms/buttonsTypeForm';
import Button from '../buttons/main';
import { v4 as uuidv4 } from 'uuid';
import { toast,ToastPosition } from 'react-toastify';


// interface ButtonsTypeProps  {
//     data: any[];
//     className: string;
// }

const componentsMap: any = {
    buttonsType:  () => {return (ButtonsType)}, 
};

const formsMap:any = {
    buttonsType: ()=>{return(ButtonsTypeForm)}
}

interface FormData {
    title: string;
    imageSrc: string;
    description: string;
    redirectText: string;
    type: string;
    element: any[];
    uniqueName: string;
    created_by: string;
    created_at: string;
    logo: string;
    position: {
        x: number,
        y: number
    }
}


const EditorPage: React.FC = () => {
    const [elementType, setElementType] = useState<string>('');
    const [SelectedComponent, setSelectedComponent] = useState<any | null>('');
    const [SelectedForm, setSelectedForm] = useState<any | null>('');
    const [componentRenderData, setcomponentRenderData] = useState<any[]>([]);
    // const [componentTitle, setcomponentTitle] = useState<string>('');
    const getRandomPosition = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

    const [formData, setFormData] = useState<FormData>({
        title: '',
        imageSrc: '/placeholder.avif',
        description: '',
        redirectText: '',
        type: 'buttonsType',
        element:[],
        uniqueName:uuidv4(),
        created_by: 'Lukzmm',
        created_at: new Date().toISOString(),
        logo: '/template_embedding_image',
        position: {
            x: getRandomPosition(-12,1200),
            y: getRandomPosition(100,800)
        }
    });

    // useEffect(() => {
    //     if (!SelectedForm) {
    //         localStorage.removeItem('componentRenderData');
    //     }
    // }, [SelectedForm]);

    useEffect(() => {
     
        setSelectedComponent(componentsMap[elementType] || null);
        setSelectedForm(formsMap[elementType])
        
      
        const componentData = localStorage.getItem("componentRenderData");
        if (componentData) {

            const parsedData: [] = JSON.parse(componentData);
            setcomponentRenderData(parsedData);
            
        }
        
    }, [elementType]);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData: FormData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleComponentRenderDataChange = (data: []) => {
        setcomponentRenderData(data);
        
        localStorage.setItem("componentRenderData", JSON.stringify(data));
    };

    const mostrarToast = (text:string,position:ToastPosition) => {
    
        toast(text, {
            position: position,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        })
    };

    const saveComponent = async ()=>{
        formData.element =  componentRenderData
        const currentUrl = window.location.href.split('element')[0];

        const response = await fetch(`${currentUrl}/api/savetoemb/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });

        console.log(response);

        setFormData({title: '',
            imageSrc: '/placeholder.avif',
            description: '',
            redirectText: '',
            type: '',
            element:[],
            uniqueName:uuidv4(),
            created_by: 'Lukzmm',
            created_at: new Date().toISOString(),
            logo: '/template_embedding_image',
            position: {
                x: 0,
                y: 0
            }
        })
        
        mostrarToast("Elemento criado com sucesso","top-right")
        window.location.href = "/";

    }
    
    return (
        <div className="flex h-screen">
            <div className="w-1/2 p-4 border-r border-gray-300">
                <h2 className="text-xl font-bold mb-2">Element Creator</h2>
                <div className="mt-16">
                    <form onSubmit={(e) => { e.preventDefault(); }}>
                        <div className='overflow-y-scroll max-h-96'>
                            <div className="mb-4 ">
                                <label className="block text-sm font-medium mb-1">ID do componente:</label>
                                <input
                                    type='text'
                                    name='uniqueName'
                                    required
                                    disabled={true}
                                    onChange={handleFormChange}
                                    value={formData.uniqueName}
                                    className='w-full border rounded p-2 bg-black'
                                    placeholder='Id do componente'
                                />
                                <label className="block text-sm font-medium mb-1 mt-5">Titulo do componente:</label>
                                <input
                                    type='text'
                                    name='title'
                                    onChange={handleFormChange}
                                    value={formData.title}
                                    className='w-full border rounded p-2 bg-black'
                                    placeholder='Titulo do componente'
                                />
                                <label className="block text-sm font-medium mb-1 mt-5">Descrição do componente:</label>
                                <input
                                    type='text'
                                    name='description'
                                    onChange={handleFormChange}
                                    value={formData.description}
                                    className='w-full border rounded p-2 bg-black'
                                    placeholder='Descrição do componente'
                                />
                                <label className="block text-sm font-medium mb-1 mt-5">Texto do link:</label>
                                <input
                                    type='text'
                                    name='redirectText'
                                    onChange={handleFormChange}
                                    value={formData.redirectText}
                                    className='w-full border rounded p-2 bg-black'
                                    placeholder='Texto do link...'
                                />
                                <label className="block text-sm font-medium mb-1 mt-5">Posição X:</label>
                                <input
                                    type='text'
                                    name='positionX'
                                    onChange={handleFormChange}
                                    value={formData.position.x}
                                    className='w-full border rounded p-2 bg-black'
                                    placeholder='Posição X'
                                    required
                                    disabled={true}
                                />
                                <label className="block text-sm font-medium mb-1 mt-5">Posição Y:</label>
                                <input
                                    type='text'
                                    name='positionY'
                                    onChange={handleFormChange}
                                    value={formData.position.y}
                                    className='w-full border rounded p-2 bg-black'
                                    placeholder='Posição Y'
                                    required
                                    disabled={true}
                                />
                                <label className="block text-sm font-medium mb-1 mt-5">Tipo do componente:</label>
                                <select
                                    name='type'
                                    value={elementType}
                                    onChange={(e) => {
                                        setElementType(e.target.value);
                                    }}
                                    className="w-full border rounded p-2 bg-black"
                                >
                                    <option key="Selecione um tipo" value="">Selecione um tipo</option>
                                    {Object.keys(componentsMap).map(key => (
                                        <option key={key} value={key}>{key}</option>
                                    ))}
                                </select>
                            </div>
                            {SelectedForm ? (
                                <SelectedForm onChange={handleComponentRenderDataChange} formData={formData} />
                            ) : (
                                <p>No component type selected</p>
                            )}
                        </div>
                        <Button
                            variant="dark"
                            onClick={async ()=>{await saveComponent()}}
                            className="w-full bg-blue-500 text-white rounded p-2 mt-5"
                        >
                            Save component
                        </Button>
                    </form>
                </div>
            </div>
            <div className="w-1/2 p-4 bg-white mt-16">
                <h2 className="text-xl font-bold mb-2 text-slate-950">Preview</h2>
                <div style={{ width: '100%', height: '90%', border: 'none' }}>
                    {SelectedComponent ? (
                        <SelectedComponent data={componentRenderData || []} />
                    ) : (
                        <p>No component selected</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditorPage;
