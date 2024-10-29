'use client';

//import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import React, { ComponentType, useEffect, useState, Suspense } from 'react';
import jsonData from '../embbedings.json';

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

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        setComponent(searchParams.get('component'));
        setName(searchParams.get('name'));
    }, []);

    useEffect(() => {
        const storedData = jsonData.find(item => item.uniqueName === name)?.element;
        if (storedData) {
            setData(storedData);
        }
    }, [name]);

    const ComponentToRender = component ? componentsMap[component] : null;

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="w-full h-screen bg-white">
                {ComponentToRender ? (
                    <ComponentToRender
                        data={data}
                        className="w-1/2 mx-auto items-center justify-center min-h-screen"
                    />
                ) : (
                    <div>Componente não encontrado</div>
                )}
            </div>
        </Suspense>
    );
};

export default DynamicComponentPage;
