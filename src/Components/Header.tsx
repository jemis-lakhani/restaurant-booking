"use client"
import react,{ useState } from "react";
import Link from "next/link";
import Logo from "@/utils/image/Logo.png"
import Image from "next/image";

export const Title = ()=>
    ( 
    <a href="/">  
    <Image data-testid="logo" id="" className ="h-24 w-36 p-2" alt="logo" src={Logo}/>
    </a>
    );

const title = "Restaurant";

const Header = ()=>{

    return (
    <div className="sticky top-0 flex justify-between z-50 bg-pink-50 shadow-lg sm:bg-blue-50 md:bg-yellow-50" >
    <Title/>
    <h1 className="py-10">{title}</h1>
    <div className="nav-item">
        <ul className="flex py-10">
        <li className="px-2 "><Link href="/home">Home</Link></li>
        <li className="px-2 "> <Link href="/profile">Profile</Link></li>
        </ul>
    </div>
    </div>
    ); 
};

export default Header;
