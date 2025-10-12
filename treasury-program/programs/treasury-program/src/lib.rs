pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

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
}
