"use client";
import Link from "next/link";
/* import Button from "../buttons/main";
 */

export default function Navbar(){

    return(
        <nav className="flex justify-between items-center p-4 bg-black fixed w-full">
            <div className="flex items-center space-x-4">
                <div className="text-white text-xl font-bold">Embbeddings</div>
            </div>
            <div className="space-x-4 justify-self-center">
                <Link href="/" className="text-gray-400 hover:text-white">Home</Link>
                <Link href="/create" className="text-gray-400 hover:text-white">Criar</Link>
            </div>
           
        </nav>
    )
}