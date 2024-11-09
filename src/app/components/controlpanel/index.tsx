'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '../buttons/main';
import { ToastContainer, toast, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import embbedings from '../../embbedings.json';

interface ModalProps {
  data: { name: string | null; component: string | null };
  isOpen: boolean;
  onClose: () => void;
}

const copiarTexto = async (textoParaCopiar: string) => {
  const currentUrl = window.location.href.split('element')[0];
  try {
    await navigator.clipboard.writeText(`${currentUrl}${textoParaCopiar}`);
    console.log('Link copiado:', textoParaCopiar);
  } catch (err) {
    console.error('Falha ao copiar: ', err);
  }
};

interface EmbeddingItem {
  uniqueName: string;
  title: string;
}

const mostrarToast = (text: string, position: ToastPosition) => {
  toast(text, {
    position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  });
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, data }) => {
  const [embbedingsData, setEmbbedingsData] = useState<EmbeddingItem[] | null>(null);
  const [name, setName] = useState(data.name);

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    setName(storedName);
    const filteredData = embbedings.filter((item) => item.uniqueName === storedName);
    setEmbbedingsData(filteredData);
  }, [data.name]);

  const deleteElement = async () => {
    if (name) {
      try {
        const currentUrl = window.location.href.split('element')[0];
        const response = await fetch(`${currentUrl}/api/excludetoemb/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uniqueName: name }),
        });
  
        if (response.ok) {
          mostrarToast('Item deletado com sucesso!', 'top-right');
          setEmbbedingsData((prev) => prev?.filter((item) => item.uniqueName !== name) || []);
        } else {
          console.error('Erro ao deletar o item.');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="inset-0 z-50 fixed flex flex-col mt-20 w-1/3 h-screen p-4 transition duration-500 ease-in-out">
      <div className="relative bg-gradient-to-r from-gray-600 to-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <Button onClick={onClose} variant="dark" className="absolute top-4 right-4 text-white text-2xl hover:bg-red-600">
          X
        </Button>
        <div className="flex items-center">
          <Image src="/teste.jpg" alt="Elemento" className="w-36 h-36 rounded-lg shadow-lg" width={400} height={400} />
          <div className="ml-6">
            <p className="text-white text-sm">Tipo</p>
            <h1 className="text-4xl font-bold text-white"> {embbedingsData && embbedingsData[0]?.title}</h1>
            <div className="flex items-center mt-2">
              <Image src="/template_embedding_image.png" alt="Criador" className="w-6 h-6 rounded-full" width={400} height={400} />
              <p className="text-white text-sm ml-2">Lukzmm • 25/10/2024 • 14:43</p>
            </div>
          </div>
        </div>
        <div className="flex items-center mt-6">
          <Button
            onClick={() => {
              mostrarToast('📋 Link copiado para área de transferência', 'top-right');
              copiarTexto(`export?component=${data.component}&&name=${data.name}`);
            }}
            variant="dark"
            className="bg-green-500 text-white p-4 w-52 shadow-lg"
          >
            Exportar Link
          </Button>

          <Button
            onClick={deleteElement}
            variant="dark"
            className="text-white p-4 w-52 shadow-lg ml-4 hover:bg-red-600"
          >
            Deletar
          </Button>
        </div>
        <div className="flex items-center mt-6">
          <Image src="/template_embedding_image.png" alt="Criador" className="w-12 h-12 rounded-full" width={400} height={400} />
          <div className="ml-4">
            <p className="text-white text-sm">Criador</p>
            <p className="text-white text-lg font-bold">Lukzmm</p>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
};

export default Modal;
