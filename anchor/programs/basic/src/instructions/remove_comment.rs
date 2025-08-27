use crate::state::*;
use anchor_lang::prelude::*;

pub fn _remove_comment(_: Context<RemoveComment>, _serial_number: i32) -> Result<()> {
    Ok(())
}

#[derive(Accounts)]
#[instruction(_serial_number:i32)]
pub struct RemoveComment<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    pub blog: Account<'info, Blog>,
    #[account(
        mut, 
        close = signer, 
        seeds=[b"comment",_serial_number.to_be_bytes().as_ref(),signer.key().as_ref(), blog.key().as_ref()],
        bump
    )]
    pub comment: Account<'info, Comment>,
}
