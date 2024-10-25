'use client';

import React from "react"
import Image from "next/image"
import Button from "../buttons/main"

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return(
        <div className="inset-0 z-50 fixed flex flex-col mt-20 w-1/3 h-screen p-4 transition duration-500 ease-in-out">
                    <div className="relative bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-lg shadow-lg w-full max-w-4xl">
                        <Button onClick={()=>{onClose()}} disabled={false} variant="dark" className="absolute top-4 right-4 text-white text-2xl hover:bg-red-600">
                           X
                        </Button>
                        <div className="flex items-center">
                            <Image src="/teste.jpg" alt="" className="w-36 h-36 rounded-lg shadow-lg" width={400} height={400}/>
                            <div className="ml-6">
                                <p className="text-white text-sm">Tipo</p>
                                <h1 className="text-4xl font-bold text-white">Teste elemento</h1>
                                <div className="flex items-center mt-2">
                                    <Image src="/template_embedding_image.png" alt="Artist profile picture" className="w-6 h-6 rounded-full" width={400} height={400}/>
                                    <p className="text-white text-sm ml-2">Lukzmm • 25/10 • 2024 • 14:43</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center mt-6">
                            <Button onClick={()=>{}} disabled={false} variant="dark" className='bg-green-500 text-white p-4 w-52 shadow-lg'>Exportar Link</Button>

                            <Button onClick={()=>{}} disabled={false} variant="dark" className=' text-white p-4 w-52 shadow-lg ml-4 hover:bg-red-600'>Deletar</Button>

                        </div>
                        <div className="flex items-center mt-6">
                            <Image src="/template_embedding_image.png" alt="" className="w-12 h-12 rounded-full" width={400} height={400}/>
                            <div className="ml-4">
                                <p className="text-white text-sm">Criador</p>
                                <p className="text-white text-lg font-bold">Lukzmm</p>
                            </div>
                        </div>
                    </div>
                </div>
    )
}

export default Modal;
