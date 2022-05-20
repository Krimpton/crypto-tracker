export interface ICurrency {
  id: string;
  name?: string;
  symbol?: string;
  image?: any;
  current_price?: number | any;
  market_cap?: any;
  market_cap_rank?: number;
  fully_diluted_valuation?: number;
  total_volume?: number;
  high_24h?: any;
  low_24h?: number;
  price_change_24h?: number;
  price_change_percentage_24h?: number;
  market_cap_change_24h?: number;
  market_cap_change_percentage_24h?: any;
  circulating_supply?: number;
  total_supply?: number;
  max_supply?: number;
  ath?: number;
  ath_change_percentage?: number;
  ath_date?: string;
  atl?: number;
  atl_change_percentage?: number;
  atl_date?: string;
  last_updated?: string;
}
