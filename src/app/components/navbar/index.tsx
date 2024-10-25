"use client";
import Button from "../buttons/main";


export default function Navbar(){

    return(
        <nav className="flex items-center justify-between p-4 bg-black fixed w-full">
            <div className="flex items-center space-x-4">
                <div className="text-white text-xl font-bold">Embbeddings</div>
            </div>
            <div className="flex items-center space-x-4">
                <a href="/" className="text-gray-400 hover:text-white">Home</a>
                <a href="/create" className="text-gray-400 hover:text-white">Criar</a>
            </div>
            <div className="flex items-center space-x-2">
                <div className="relative">
                    <input type="text" placeholder="Search" className="bg-gray-800 text-gray-400 px-4 py-2 rounded-md focus:outline-none" />
                    <span className="absolute right-2 top-2 text-gray-400">CTRL K</span>
                </div>
                <Button onClick={()=>{}} disabled={false} variant="dark">TESTE</Button>
                <Button onClick={()=>{}} disabled={false} variant="light">TESTE</Button>
            </div>
        </nav>
    )
}