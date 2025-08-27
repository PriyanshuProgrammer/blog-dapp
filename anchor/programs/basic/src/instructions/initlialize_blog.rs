use crate::state::*;
use anchor_lang::prelude::*;

pub fn _initialize_blog(ctx: Context<InitializeBlog>, _serial_number: String, title:String, content:String) -> Result<()> {
    ctx.accounts.blog.title = title;
    ctx.accounts.blog.content = content;
    ctx.accounts.blog.blog_author = ctx.accounts.signer.key();
    ctx.accounts.blog.likes = 0;
    ctx.accounts.blog.dislikes = 0;
    ctx.accounts.blog.comment_counter = 0;
    Ok(())
}

#[derive(Accounts)]
#[instruction(_serial_number:String)]
pub struct InitializeBlog<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(
        init, 
        payer = signer, 
        space = 8 + Blog::INIT_SPACE,
        seeds=[b"blog",_serial_number.as_bytes().as_ref(),signer.key().as_ref()],
        bump,
    )]
    pub blog: Account<'info, Blog>,
    pub system_program: Program<'info, System>,
}
