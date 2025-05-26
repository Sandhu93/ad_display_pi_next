"use client";

import { useEffect, useState } from "react";

interface StockData {
  symbol: string;
  price: number;
  change: number;
}

export default function StockTicker() {
  const [stocks, setStocks] = useState<StockData[]>([]);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch("/api/stocks");
        const data = await response.json();
        setStocks(data);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setStocks([]); // Set stocks to an empty array on error
      }
    };

    fetchStockData();
    const interval = setInterval(fetchStockData, 5 * 60 * 1000); // every 5 min

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex flex-wrap gap-4">
        {stocks.map((stock) => (
          <div
            key={stock.symbol}
            className="flex items-center gap-2 bg-gray-700 p-2 rounded text-[clamp(0.9rem,1.8vw,1.8rem)]">
            <span className="font-bold">{stock.symbol}</span>
            <span>{stock.price.toFixed(2)}</span>
            <span
              className={`${
                stock.change >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {stock.change >= 0 ? "↑" : "↓"}{" "}
              {Math.abs(stock.change).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );

}
