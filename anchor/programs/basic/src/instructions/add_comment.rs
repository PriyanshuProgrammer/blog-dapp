use anchor_lang::prelude::*;
use crate::state::*;

pub fn _add_comment(ctx: Context<AddComment>,comment: String) -> Result<()> {
    ctx.accounts.comment.blog = ctx.accounts.blog.key();
    ctx.accounts.comment.comment = comment;
    ctx.accounts.comment.comment_author = ctx.accounts.signer.key();
    ctx.accounts.comment.index = ctx.accounts.blog.comment_counter;
    ctx.accounts.blog.comment_counter += 1;
    Ok(())
}

#[derive(Accounts)]
pub struct AddComment<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    pub blog: Account<'info, Blog>,
    #[account(
        init, 
        payer = signer, 
        space = 8 + Comment::INIT_SPACE, 
        seeds=[b"comment", blog.comment_counter.to_be_bytes().as_ref() ,signer.key().as_ref(), blog.key().as_ref()],
        bump
    )]
    pub comment: Account<'info, Comment>,
    pub system_program: Program<'info, System>
}
