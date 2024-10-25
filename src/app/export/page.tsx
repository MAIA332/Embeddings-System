'use client';

import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import React, { ComponentType, useEffect, useState } from 'react';
import jsonData from "../embbedings.json";


interface DynamicComponentProps {
    data: any[]; 
    className: string;
}

const componentsMap: Record<string, ComponentType<DynamicComponentProps>> = {
    buttonsType: dynamic(() => import('../components/dinamics/buttonsType')),
};

const DynamicComponentPage: React.FC = () => {
    const searchParams = useSearchParams();
    const component = searchParams.get('component');
    const name = searchParams.get('name')
    console.log(name);
    
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {

        const storedData = jsonData.filter(item=>item.uniqueName==name)[0].element
        console.log("stored",storedData);
        
        if (storedData) {
            setData(storedData);
        }
    }, [name]);

    const ComponentToRender = component && typeof component === 'string' ? componentsMap[component] : null;

    return (
        <div className='w-full h-screen bg-white'>
            {ComponentToRender ? (
                <ComponentToRender data={data} className={"w-1/2 mx-auto items-center justify-center min-h-screen"}/>
            ) : (
                <div>Componente não encontrado</div>
                
            )}
        </div>
    );
};

export default DynamicComponentPage;