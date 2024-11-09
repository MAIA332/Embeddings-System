"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '../buttons/main';

type CardProps = {
  imageSrc: string;
  title: string;
  description: string;
  redirectLink: string;
  redirectText: string;
  type: string;
  element: any[];
  uniqueName: string;
  positionX: number;
  positionY: number;

};

const handleCardClick = (component: string, rule: any[], location: string, type: string) => {
  localStorage.setItem(component, JSON.stringify(rule));
  localStorage.setItem("component", type);
  localStorage.setItem("name", component);
  window.location.href = location;
};

const handleComponentChange = async (data: any) => {
  const currentUrl = window.location.href.split('element')[0];
  const response = await fetch(`${currentUrl}/api/updatetoemb/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  console.log(response);
};

const Card: React.FC<CardProps> = ({
  imageSrc = "",
  title = "",
  description = "",
  redirectLink = "",
  redirectText = "",
  type = "",
  element,
  uniqueName,
  positionX,
  positionY,

}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: positionX, y: positionY });
  const [initialMousePos, setInitialMousePos] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [forceRender, setForceRender] = useState(0); // Usado para forçar re-render

  useEffect(() => {
    setPosition({ x: positionX, y: positionY });
  }, [positionX, positionY]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setInitialMousePos({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const newX = e.clientX - initialMousePos.x;
    const newY = e.clientY - initialMousePos.y;
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = async () => {
    setIsDragging(false);

    const updatedCardData = {
      title,
      imageSrc,
      description,
      redirectText,
      type,
      element,
      uniqueName,
      position: position,
    };
    await handleComponentChange(updatedCardData);

    setForceRender(forceRender + 1);
  };

  return (
    <div
      className="bg-black rounded-lg p-6 m-4 border border-gray-700 w-80"
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Image src={imageSrc} alt={title} className="mb-4" width={100} height={100} />
      <Button onClick={() => handleCardClick(uniqueName, element, redirectLink, type)} disabled={false} variant="light">
        {redirectText}
      </Button>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default Card;
