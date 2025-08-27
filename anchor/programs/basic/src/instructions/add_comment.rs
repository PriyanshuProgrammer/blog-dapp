use anchor_lang::prelude::*;
use crate::state::*;

pub fn _add_comment(ctx: Context<AddComment>) -> Result<()> {
    Ok(())
}

#[derive(Accounts)]
#[instruction(_serial_number:String)]
pub struct AddComment<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    pub blog: Account<'info, Blog>,
}
