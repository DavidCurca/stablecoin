pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;
pub mod events;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;
pub use events::*;

declare_id!("4rb1DKF1uAE3eXtVFX9Jb7ao8qXRZAMTzvnkRd9QR1Vq");

#[program]
pub mod treasury_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
      initialize::handler(ctx)
    }

    pub fn flow(ctx: Context<Flow>, amount: u64, refrence_code: String) -> Result<()> {
      flow::handler(ctx, amount, refrence_code)
    }

    pub fn redeem(ctx: Context<Redeem>, amount: u64, refrence_code: String) -> Result<()> {
      redeem::handler(ctx, amount, refrence_code)
    }

    pub fn update_oracle(ctx: Context<Update>, new_value: u64, index: u32) -> Result<()> {
      update_oracle::handler(ctx, amount, refrence_code)
    }
    
    pub fn create_proposal(ctx: Context<Create>, index: u32) -> Result<()> {
      create_proposal::handler(ctx, index)
    }
}
