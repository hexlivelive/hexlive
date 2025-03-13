"use client";

import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronDown,
  ExternalLink,
  TrendingUp,
  DollarSign,
  Percent,
  ArrowUpDown,
  ChevronUp,
  Info,
} from "lucide-react";
import { getPairs } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";

interface LiquidityPool {
  id: string;
  tokenPair: string;
  token0Symbol: string;
  token1Symbol: string;
  tvl: number;
  apy: number;
  volume24h: number;
  feeTier: string;
}

interface DexOption {
  id: string;
  name: string;
  logo: string;
  color: string;
}

const dexOptions: DexOption[] = [
  { id: "uniswap", name: "Uniswap", logo: "U", color: "text-pink-400" },
  { id: "sushiswap", name: "SushiSwap", logo: "🍣", color: "text-blue-400" },
  {
    id: "pancakeswap",
    name: "PancakeSwap",
    logo: "🥞",
    color: "text-yellow-400",
  },
  { id: "curve", name: "Curve", logo: "C", color: "text-red-400" },
  { id: "balancer", name: "Balancer", logo: "B", color: "text-purple-400" },
];

export default function LiquidityPoolGrid() {
  const [selectedDex, setSelectedDex] = useState<DexOption>(dexOptions[0]);
  const [pools, setPools] = useState<ModelPair[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<keyof ModelPair>("pair_id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const isMobile = useMobile();

  useEffect(() => {
    const getLiquidityPools = async () => {
      try {
        setLoading(true);
        const response = await getPairs(1, 10, 0);
        console.log("Fetched pools data:", response);
        console.log("Fetched pools data:", response.data);
        setPools(response.data || []);
      } catch (error) {
        console.error("Failed to fetch liquidity pools:", error);
        setPools([]);
      } finally {
        setLoading(false);
      }
    };

    getLiquidityPools();
  }, [selectedDex]);

  let sortedPools: ModelPair[] = [];

  if (pools.length > 0) {
    console.log("here");
    // Only sort pools if we have data
    sortedPools = [...pools].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortDirection === "asc"
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });
  }

  // Render mobile card view or desktop table view based on screen size
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-blue-400">Liquidity Pools</h2>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-blue-500/20 bg-black/40 text-gray-300 hover:bg-blue-900/20 hover:text-blue-400"
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full bg-black/60",
                    selectedDex.color
                  )}
                >
                  <span className="text-xs">{selectedDex.logo}</span>
                </div>
                <span>{selectedDex.name}</span>
              </div>
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-[200px] border-gray-800 bg-black/90 backdrop-blur-sm"
          >
            {dexOptions.map((dex) => (
              <DropdownMenuItem
                key={dex.id}
                onClick={() => setSelectedDex(dex)}
                className="text-gray-300 focus:bg-gray-800 focus:text-blue-400"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full bg-black/60",
                      dex.color
                    )}
                  >
                    <span className="text-xs">{dex.logo}</span>
                  </div>
                  <span>{dex.name}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="relative overflow-hidden rounded-lg border border-gray-800/50 bg-black/40 shadow-[0_0_15px_rgba(0,128,255,0.1)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-black/60 text-xs uppercase text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  PoolId
                </th>
                <th scope="col" className="px-6 py-3">
                  Token 0
                </th>
                <th scope="col" className="px-6 py-3">
                  Token 1
                </th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? // Skeleton loading state
                  Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <tr
                        key={`skeleton-${index}`}
                        className="border-b border-gray-800/30 bg-black/20"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Skeleton className="h-8 w-16 rounded-full" />
                            <Skeleton className="h-4 w-24" />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Skeleton className="h-4 w-20" />
                        </td>
                        <td className="px-6 py-4">
                          <Skeleton className="h-4 w-16" />
                        </td>
                      </tr>
                    ))
                : sortedPools.map((pool) => (
                    <tr
                      key={`pool-${pool.pair_id}`}
                      className="border-b border-gray-800/30 bg-black/20 transition-colors hover:bg-blue-900/10"
                    >
                      <td className="px-6 py-4 text-gray-200">
                        {pool.pair_id}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-blue-400 hover:text-blue-300 cursor-pointer">
                          {pool.token0_address}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-blue-400 hover:text-blue-300 cursor-pointer">
                          {pool.token1_address}
                        </span>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      {!loading && pools.length === 0 && (
        <div className="flex h-40 items-center justify-center rounded-lg border border-gray-800/50 bg-black/40 p-4">
          <p className="text-gray-500">No liquidity pools found</p>
        </div>
      )}

      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Info className="h-3 w-3" />
        <p>
          {isMobile ? "Showing" : "Click on column headers to sort. Showing"}{" "}
          {sortedPools.length} pools from {selectedDex.name}
        </p>
      </div>
    </div>
  );
}
