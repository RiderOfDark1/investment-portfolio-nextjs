"use client";
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

export default function RealTimeStocks() {
    const [stockData, setStockData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/stocks?symbols=AAPL,GOOGL');
                const data = await response.json();

                if(response.ok) {
                    setStockData(data.data);
                } else {
                    throw new Error(data.error || 'Failed to fetch stock data!');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchStockData();
    }, []);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="max-w-md">
             <h2 className="-scroll-ml-20 text-xl font-extrabold tracking-tight lg:text-3xl mb-6">
                Real time stocks
            </h2>
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">Symbol</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {stockData.map((stock) => (
                        <TableRow key={stock.symbol}>
                            <TableCell className="font-medium">{stock.symbol}</TableCell>
                            <TableCell>${stock.price}</TableCell>
                            <TableCell>{stock.time}</TableCell>
                            <TableCell className="text-right">
                                <Button>Buy</Button>
                            </TableCell>
                        </TableRow>
                    ))}  
                </TableBody>
            </Table>
        </div>
    );
}