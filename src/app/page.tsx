"use client"

import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import Card from "./components/cards";

interface CardData {
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
    x: number;
    y: number;
  };
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState<CardData[]>([]); 
  
  const fetchData = async () => {
    const res = await fetch('/embbedings.json');
    const data = await res.json();
    setData(data);
};

  useEffect(() => {
    fetchData();
  }, []); 

  const filteredData = data.filter(item => {
    const searchLower = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(searchLower) || 
      item.description.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div>
      <Navbar />
      <div className="search-bar">
        <input
          type="text"
          placeholder="Pesquisar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Atualiza o valor de busca
          className="border p-2 rounded mt-20 ml-5 text-black"
        />
      </div>
      <div className="flex justify-center items-center min-h-screen w-full">
        <div className="grid grid-cols-3 space-x-4">

          {filteredData.map((item) => {
            return (
              <Card
                key={item.uniqueName}
                imageSrc={item.imageSrc}
                title={item.title}
                description={item.description}
                redirectLink={`/element`}
                redirectText={item.redirectText}
                element={item.element}
                type={item.type}
                uniqueName={item.uniqueName}
                positionX={item.position.x}
                positionY={item.position.y}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
