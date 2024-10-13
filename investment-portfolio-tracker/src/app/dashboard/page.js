"use client";

import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import RealTimeStocks from "@/components/RealTimeStocks";
import UserStocks from "@/components/UserStocks";
  

export default function Dashboard(){
    useAuth();

    
    const [error, setError] = useState('');
    

    

    return(
        <div className="p-5">
            <h1 className="-scroll-ml-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                Investment porfolio
            </h1>
            {error && <p>{error}</p>}
            <h2 className="-scroll-ml-20 text-xl font-extrabold tracking-tight lg:text-3xl mb-6">
                My stocks
            </h2>
            <UserStocks />
            <RealTimeStocks />
        </div>
    );
}