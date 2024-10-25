'use client';

import dynamic from 'next/dynamic';
import React, { ComponentType, useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Button from '../components/buttons/main';
import Modal from '../components/controlpanel';

interface DynamicComponentProps {
    data: any[]; 
    className: string;
}

const componentsMap: Record<string, ComponentType<DynamicComponentProps>> = {
    buttonsType: dynamic(() => import('../components/dinamics/buttonsType')),
};

const DynamicComponentPage: React.FC = () => {
    
    
    const [data, setData] = useState<any[]>([]);
    const [component, setComponent] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a modal


    useEffect(() => {
        const name = localStorage.getItem("name");
        const component = localStorage.getItem("component");

        setComponent(component)
        setName(name)
    
        const storedData = localStorage.getItem(name!);
        
        if (storedData) {
            setData(JSON.parse(storedData));
        }
    }, [name,component]);

    const ComponentToRender = component && typeof component === 'string' ? componentsMap[component] : null;

    return (
        <div className='relative min-h-screen'>
            <Navbar/>
            {ComponentToRender ? (
                <ComponentToRender data={data} className={"w-1/2 mx-auto items-center justify-center min-h-screen"}/>
            ) : (
                <div>Componente não encontrado</div>
            )}
            <Button onClick={() => setIsModalOpen(!isModalOpen)} disabled={false} variant="light" className='absolute right-0 bottom-0 mb-4 mr-4'>Painel de controle</Button>
        
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        </div>
    );
};

export default DynamicComponentPage;