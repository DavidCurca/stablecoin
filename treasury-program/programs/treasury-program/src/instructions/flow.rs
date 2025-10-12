use anchor_lang::prelude::*;
use crate::constants::BURN_AUTHORITY;
use anchor_spl::{
  associated_token::AssociatedToken,
  token_interface::{self, Mint, MintTo, TokenAccount, TokenInterface},
};

#[derive(Accounts)]
pub struct Flow<'info> {
  #[account(mut)]
  pub user: Signer<'info>,
  
  #[account(signer)]
  pub signer: AccountInfo<'info>,
  #[account(
    mut,
    seeds = [BURN_AUTHORITY.as_ref()],
    bump
  )]
  pub burn_authority: AccountInfo<'info>,
  #[account(
    init_if_needed,
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

pub fn handler(ctx: Context<Flow>, amount: u64, refrence_code: String) -> Result<()> {
    msg!("user {} requested to mint {} RONC", ctx.accounts.user, amount);
    Ok(())
}