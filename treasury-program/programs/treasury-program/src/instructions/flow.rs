use anchor_lang::prelude::*;
use crate::constants::MINT_AUTHORITY;
use crate::events::MintEvent;
use anchor_spl::{
  associated_token::AssociatedToken,
  token_interface::{self, Mint, MintTo, TokenAccount, TokenInterface},
};

#[derive(Accounts)]
pub struct Flow<'info> {
  #[account(mut, signer)]
  pub user: AccountInfo<'info>,
  
  #[account(signer)]
  pub signer: AccountInfo<'info>,
  #[account(
    mut,
    seeds = [MINT_AUTHORITY.as_ref()],
    bump
  )]
  pub mint_authority: AccountInfo<'info>,
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

// mint `amount` tokens to user vault (use CPI signed by the `mint_authority` PDA), emit event
pub fn handler(ctx: Context<Flow>, amount: u64, refrence_code: String) -> Result<()> {
  msg!("user {:?} requested to mint {} RONC", ctx.accounts.user.key(), amount);
  // emit!(MintEvent {
  //   user: ctx.accounts.user.key(),
  //   amount: amount,
  //   reference_code: reference_code
  // });
  Ok(())
}