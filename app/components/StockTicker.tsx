"use client";

import { useState, useEffect } from "react";

interface StockData {
  symbol: string;
  price: number;
  change: number;
}

export default function StockTicker() {
  const [stocks, setStocks] = useState<StockData[]>([
    { symbol: "NIFTY50", price: 19500.25, change: 0.75 },
    { symbol: "SENSEX", price: 65420.75, change: -0.25 },
    // Add more default stocks as needed
  ]);

  useEffect(() => {
    // Here you would typically fetch real stock data from an API
    const fetchStockData = async () => {
      try {
        // Replace with your actual stock API endpoint
        // const response = await fetch('your-stock-api-endpoint');
        // const data = await response.json();
        // setStocks(data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStockData();
    const interval = setInterval(fetchStockData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex flex-wrap gap-4">
        {stocks.map((stock) => (
          <div
            key={stock.symbol}
            className="flex items-center gap-2 bg-gray-700 p-2 rounded"
          >
            <span className="font-bold">{stock.symbol}</span>
            <span>{stock.price.toFixed(2)}</span>
            <span
              className={`${
                stock.change >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {stock.change >= 0 ? "↑" : "↓"} {Math.abs(stock.change)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
