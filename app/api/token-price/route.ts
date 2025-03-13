import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const tokenAddress = searchParams.get("tokenAddress");
  const chain = searchParams.get("chain") || "pulse";

  if (!tokenAddress) {
    return NextResponse.json(
      { error: "tokenAddress is required" },
      { status: 400 }
    );
  }

  try {
    const url = `https://deep-index.moralis.io/api/v2.2/erc20/${tokenAddress}/price?chain=${chain}&include=percent_change`;

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "X-API-Key": process.env.MORALIS_API_KEY!,
      },
    });

    if (!response.ok) {
      throw new Error(`Moralis API error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching token price:", error);
    return NextResponse.json(
      { error: "Failed to fetch token price" },
      { status: 500 }
    );
  }
}
