interface Pagination {
  CurrentPage: number;
  TotalPages: number;
  TotalResults: number;
}

interface PairsResponse {
  success: boolean;
  data: ModelPair[];
  pagination: Pagination;
}

interface ModelPair {
  pair_id: number; // `json:"pair_id"`
  dex_id: number; // `json:"dex_id"`
  pair_index: number; // `json:"pair_index"`
  pair_contract_address: string; // `json:"pair_contract_address"`
  token0_erc20_id: number; // `json:"token0_erc20_id"`
  token1_erc20_id: number; // `json:"token1_erc20_id"`
  token0_address: string; // `json:"token0_address"`
  token1_address: string; // `json:"token1_address"`
  token0_erc20: ModelERC20;
  token1_erc20: ModelERC20;
  model_dex: ModelDex;
  token0_reserves: bigint; // `json:"token0_reserves"`
  token1_reserves: bigint; // `json:"token1_reserves"`
  should_find_arb: boolean; // `json:"should_find_arb"`
  is_pls_pair: boolean; // `json:"is_pls_pair"`
  has_tax_token: boolean; // `json:"has_tax_token"`
  is_high_liquidity: boolean; // `json:"is_high_liquidity"`
  uniswap_v3_fee: bigint; // `json:"uniswap_v3_fee"`
  uniswap_v3_tick_spacings: bigint; // `json:"uniswap_v3_tick_spacings"`
  inserted_at: Date; // `json:"inserted_at"`
  last_updated: Date; // `json:"last_updated"`
  last_time_reserves_updated: Date; // `json:"last_time_reserves_updated"`
}

interface ModelERC20 {
  Erc20Id: number; // `postgres.Table:"ERC20_ID"`
  NetworkId: number; // `postgres.Table:"NETWORK_ID"`
  ContractAddress: string; // `postgres.Table:"CONTRACT_ADDRESS"`
  Name: string; // `postgres.Table:"NAME"`
  Symbol: string; // `postgres.Table:"SYMBOL"`
  Decimal: number; // `postgres.Table:"DECIMAL"` (uint8 mapped to number)
  ShouldFindArb: boolean; // `postgres.Table:"SHOULD_FIND_ARB"`
  IsValidated: boolean; // `postgres.Table:"IS_VALIDATED"`
  IsTaxToken: boolean; // `postgres.Table:"IS_TAX_TOKEN"`
  TaxPercentage: number; // `postgres.Table:"TAX_PERCENTAGE"` (float64 mapped to number)
  ProcessedIsTaxToken: boolean; // `postgres.Table:"PROCESSED_IS_TAX_TOKEN"`
}

interface ModelDex {
  DexId: number; // Maps to Go's int
  Name: string; // Maps to Go's string
  nNetworkId: number; // Maps to Go's int
  RouterContractAddress: string; // Maps to common.Address (assumed as Ethereum address, e.g., "0x...")
  FactoryContractAddress: string; // Maps to common.Address (assumed as Ethereum address, e.g., "0x...")
  RouterAbi: string; // Maps to Go's string (likely JSON ABI)
  FactoryAbi: string; // Maps to Go's string (likely JSON ABI)
  FeeBasisPoints: bigint; // Maps to Go's int64 (using bigint for 64-bit integer precision)
  DexType: number; // Maps to Go's int
}
