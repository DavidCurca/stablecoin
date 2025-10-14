use anchor_lang::prelude::*;
use crate::constants::MINT_AUTHORITY;
use crate::events::BurnEvent;
use anchor_spl::{
  associated_token::AssociatedToken,
  token_interface::{self, Mint, MintTo, TokenAccount, TokenInterface},
};

#[derive(Accounts)]
pub struct Redeem<'info> {
  #[account(mut)]
  pub user: Signer<'info>,
  
  #[account(signer)]
  pub signer: AccountInfo<'info>,
  #[account(
    mut,
    seeds = [MINT_AUTHORITY.as_ref()],
    bump
  )]
  pub mint_authority: AccountInfo<'info>,
  #[account(
    payer = user,
    associated_token::mint = ronc_mint,
    associated_token::authority = user,
    associated_token::token_program = token_program,
  )]
  pub user_vault: InterfaceAccount<'info, TokenAccount>,
  pub ronc_mint: InterfaceAccount<'info, Mint>,

  pub associated_token_program: Program<'info, AssociatedToken>,
  pub token_program: Program<'info, TokenInterface>,
  pub system_program: Program<'info, System>,
  pub rent: Sysvar<'info, Rent>,
}

// burn `amount` tokens from user vault, emit event
pub fn handler(ctx: Context<Redeem>, amount: u64, refrence_code: String) -> Result<()> {
  msg!("user {} requested to mint {} RONC", ctx.accounts.user, amount);
  emit!(BurnEvent {
    user: ctx.accounts.user,
    amount: amount,
    reference_code: String
  });
  Ok(())
}