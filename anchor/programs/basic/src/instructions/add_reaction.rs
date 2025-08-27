use anchor_lang::prelude::*;
use crate::state::*;

pub fn _add_reaction(ctx: Context<AddReaction>, reaction: ReactionType) -> Result<()> {
    if ctx.accounts.reaction.blog == ctx.accounts.blog.key(){
        if ctx.accounts.reaction.reaction == reaction{
            return err!(Errors::ReactionReinitialize)
        }
        match reaction{
            ReactionType::Like => {
                ctx.accounts.blog.likes += 1;
                ctx.accounts.blog.dislikes -= 1;
            }, 
            ReactionType::Dislike => {
                ctx.accounts.blog.likes -= 1;
                ctx.accounts.blog.dislikes += 1;
            }
        } 
        ctx.accounts.reaction.reaction = reaction;
    }else{
        match reaction{
            ReactionType::Like => {
                ctx.accounts.blog.likes += 1;
            }, 
            ReactionType::Dislike => {
                ctx.accounts.blog.dislikes += 1;
            }
        } 
        ctx.accounts.reaction.blog = ctx.accounts.blog.key();
        ctx.accounts.reaction.reaction_author = ctx.accounts.signer.key();
        ctx.accounts.reaction.reaction = reaction;
    }
   Ok(())
}

#[derive(Accounts)]
pub struct AddReaction<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(mut)]
    pub blog: Account<'info, Blog>,
    #[account(
        init_if_needed, 
        payer = signer, 
        space = 8 +  Reaction::INIT_SPACE,
        seeds=[b"react",blog.key().as_ref(),signer.key().as_ref()],
        bump
    )]
    pub reaction: Account<'info, Reaction>,
    pub system_program: Program<'info, System>
}
