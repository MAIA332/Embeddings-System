'use client'

import React from 'react';
import Image from 'next/image';
import Button from '../buttons/main';

type ElementProps = {
  id:number
  text?: string
  className?: string
}

type CardProps = {
    imageSrc:string,
    title:string,
    description:string,
    redirectLink:string,
    redirectText:string,
    element: ElementProps | ElementProps [],
    type:string,
    uniqueName:string
};

const handleCardClick = (component: string, rule:  ElementProps | ElementProps [],location:string,type:string) => {
  localStorage.setItem(component, JSON.stringify(rule));
  localStorage.setItem("component",type)
  localStorage.setItem("name",component)
  window.location.href = location
};

const Card: React.FC<CardProps> = ({
    imageSrc="",
    title="",
    description="",
    redirectLink="",
    redirectText="",
    type="",
    element,
    uniqueName
}) => {

 
  return (
    <div className="bg-black rounded-lg p-6 m-4 border border-gray-700 w-full" draggable={true}>

        <Image src={imageSrc} alt={title} className="mb-4" width={100} height={100}/>
        <Button onClick={()=>{handleCardClick(uniqueName,element,redirectLink,type)}} disabled={false} variant="light">{redirectText}</Button>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>

    </div>
  );
};

export default Card;
