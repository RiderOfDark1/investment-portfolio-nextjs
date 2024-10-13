"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from "./ui/button";

export default function UserStocks() {
    const [investments, setInvestments] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchInvestments = async () => {
            const res = await fetch('http://localhost:5000/api/investments', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if(res.ok) {
                const data = await res.json();
                setInvestments(data);
            } else {
                setError('Failed to fetch investments!');
            }
        };

        fetchInvestments();
    }, [router]);

    return(
        <div className="max-w-md mb-10">
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">Symbol</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {investments.map((investment) => (
                        <TableRow key={investment.id}>
                            <TableCell className="font-medium">{investment.symbol}</TableCell>
                            <TableCell>{investment.quantity}</TableCell>
                            <TableCell>Credit Card</TableCell>
                            <TableCell className="text-right">${investment.purchase_price}</TableCell>
                            <TableCell className="text-right">
                                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">Sell</Button>
                            </TableCell>
                        </TableRow>
                    ))}  
                </TableBody>
            </Table>
        </div>
    );
}