#[account]
#[derive(INIT_SPACE)]
pub struct Oracle {
  pub value: u64,
  pub timestamp: i64,
  pub index: u32,
  pub bump: u8,
}

#[account]
#[derive(INIT_SPACE)]
pub struct UpdateProposal {
  pub new_value: u64,
  pub signers: [bool; 4],
  pub bump: u8,
  pub index: u32,
} 