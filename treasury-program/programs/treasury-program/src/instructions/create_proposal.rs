use anchor_lang::prelude::*;
use crate::constants::MINT_AUTHORITY;
use crate::events::BurnEvent;
use anchor_spl::{
  associated_token::AssociatedToken,
  token_interface::{self, Mint, MintTo, TokenAccount, TokenInterface},
};

#[derive(Accounts)]
pub struct Create<'info> {
  #[account(mut)]
  // CHECK: this address is one of the hardcoded relayers 
  pub relayer: Signer<'info>,
  
  #[account(
    seeds = [ORACLE_SEED.as_ref()],
    bump = oracle.bump,
  )]
  pub oracle: InterfaceAccount<'info, Oracle>,

  #[account(
    init_if_needed
    seeds = [PROPSAL_SEED.as_ref(), index.as_ref()],
    bump,
  )]
  pub proposal: InterfaceAccount<'info, UpdateProposal>

  pub system_program: Program<'info, System>,
  pub rent: Sysvar<'info, Rent>,
}

// idempotent creation of a new proposal, it should create the account if it is not created yet
// and if is matches the current index of the oracle
pub fn handler(ctx: Context<Create>, new_value: u64, index: u32) -> Result<()> {
  Ok(())
}