use anchor_lang::prelude::*;
use crate::constants::MINT_AUTHORITY;
use crate::events::BurnEvent;
use anchor_spl::{
  associated_token::AssociatedToken,
  token_interface::{self, Mint, MintTo, TokenAccount, TokenInterface},
};

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  // CHECK: this address is one of the hardcoded relayers 
  pub relayer: Signer<'info>,
  
  #[account(
    seeds = [ORACLE_SEED.as_ref()],
    bump = oracle.bump,
  )]
  pub oracle: InterfaceAccount<'info, Oracle>,

  #[account(
    seeds = [PROPSAL_SEED.as_ref(), index.as_ref()],
    bump = proposal.bump,
  )]
  pub proposal: InterfaceAccount<'info, UpdateProposal>

  pub system_program: Program<'info, System>,
  pub rent: Sysvar<'info, Rent>,
}

// a current relayer propeses to sign a new proposal (specified by an index)
// once 3/4 relayers sign and agree to update the price the oracle is updated
// and its index is incremented 
pub fn handler(ctx: Context<Update>, new_value: u64, index: u32) -> Result<()> {
  // if ctx.accounts.oracle.index != ctx.accounts.proposal.index then exit with error
  msg!("relayer {} signed a propsal to update the price to {} (index = {})", ctx.accounts.relayer, new_value, index);
  Ok(())
}