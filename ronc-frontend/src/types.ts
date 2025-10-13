export type Blockchain = 'solana' | 'polygon';

export interface Reciept {
  id: number,
  timestamp: number,
  author: string,
  operation: 'mint' | 'redeem' | 'bridge',
  amount: number,
  chain: Blockchain,
  explorer_url: string,
}

export interface OrcaleUpdate {
  id: number,
  timestamp: number,
  value: number,
  chain: Blockchain,
  explorer_url: string,
}