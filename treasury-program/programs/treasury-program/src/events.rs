#[event]
pub struct MintEvent {
  pub user: Pubkey,
  pub amount: u64,
  pub reference_code: String,
}

#[event]
pub struct BurnEvent {
  pub user: Pubkey,
  pub amount: u64,
  pub reference_code: String,
}

#[event]
pub struct OracleEvent {
  pub timestamp: i64,
  pub value: u64,
  pub index: u32,
}