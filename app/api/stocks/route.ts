import { NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";

export async function GET() {
  try {
    const nifty = await yahooFinance.quote("^NSEI");
    const sensex = await yahooFinance.quote("^BSESN");

    return NextResponse.json([
      {
        symbol: "NIFTY 50",
        price: nifty.regularMarketPrice,
        change: nifty.regularMarketChangePercent,
      },
      {
        symbol: "SENSEX",
        price: sensex.regularMarketPrice,
        change: sensex.regularMarketChangePercent,
      },
    ]);
  } catch (error) {
    console.error("Failed to fetch stock data", error);
    return NextResponse.json(
      { error: "Failed to fetch stock data" },
      { status: 500 }
    );
  }
}
