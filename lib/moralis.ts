interface TokenPriceResponse {
  nativePrice: {
    value: string;
    decimals: number;
    name: string;
    symbol: string;
  };
  usdPrice: number;
  exchangeAddress: string;
  exchangeName: string;
  usdPriceFormatted: string;
  usdPrice24hrPercentChange: number;
  priceChange: {
    "24h": number;
    "7d": number;
    "14d": number;
    "30d": number;
    "60d": number;
    "200d": number;
    "1y": number;
  };
}

export async function getTokenPrice(
  tokenAddress: string,
  chain = "pulse"
): Promise<TokenPriceResponse> {
  console.debug("Fetching token price for:", { tokenAddress, chain });

  try {
    const response = await fetch(
      `/api/token-price?tokenAddress=${tokenAddress}&chain=${chain}`
    );

    if (!response.ok) {
      console.error("Failed to fetch token price:", {
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error(`Failed to fetch token price: ${response.statusText}`);
    }

    const data = await response.json();
    console.debug("Token price data received:", {
      usdPrice: data.usdPrice,
      exchangeName: data.exchangeName,
    });

    return data;
  } catch (error) {
    console.error("Error fetching token price:", error);
    throw error;
  }
}
