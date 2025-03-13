import { NextRequest, NextResponse } from "next/server";
import { env } from "../../../lib/env";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const dexId = searchParams.get("dexId");
  const limit = searchParams.get("limit");
  const offset = searchParams.get("offset");

  if (!dexId) {
    return NextResponse.json(
      { error: "dexId is required" },
      { status: 400 }
    );
  }

  try {
    const url = `${env.BACKEND_URL}/pairs?dexId=${dexId}&limit=${limit}&offset=${offset}`;

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
       
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
