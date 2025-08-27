use crate::state::*;
use anchor_lang::prelude::*;

pub fn _remove_reaction(ctx: Context<RemoveReaction>) -> Result<()> {
    if ctx.accounts.reaction.reaction == ReactionType::Like {
        ctx.accounts.blog.likes -= 1;
    } else {
        ctx.accounts.blog.dislikes -= 1;
    }
    Ok(())
}

#[derive(Accounts)]
pub struct RemoveReaction<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(mut)]
    pub blog: Account<'info, Blog>,
    #[account(
        mut,
        close = signer,
        seeds=[b"react",blog.key().as_ref(),signer.key().as_ref()],
        bump
    )]
    pub reaction: Account<'info, Reaction>,
    pub system_program: Program<'info, System>,
}
