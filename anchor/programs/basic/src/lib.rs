#[allow(unexpected_cfgs)]
use anchor_lang::prelude::*;
mod instructions;
use instructions::*;
pub mod state;
use state::*;

declare_id!("JAVuBXeBZqXNtS73azhBDAoYaaAFfo4gWXoZe2e7Jf8H");

#[program]
pub mod basic {
    use super::*;

    pub fn initialize_blog(
        ctx: Context<InitializeBlog>,
        _serial_number: String,
        title: String,
        content: String,
    ) -> Result<()> {
        return _initialize_blog(ctx, _serial_number, title, content);
    }

    pub fn like_tweet(ctx: Context<AddReaction>) -> Result<()> {
        return _add_reaction(ctx, ReactionType::Like);
    }

    pub fn dislike_tweet(ctx: Context<AddReaction>) -> Result<()> {
        return _add_reaction(ctx, ReactionType::Dislike);
    }

    pub fn remove_reaction(ctx: Context<RemoveReaction>) -> Result<()> {
        return _remove_reaction(ctx);
    }

    pub fn add_comment(ctx: Context<AddComment>) -> Result<()> {
        return _add_comment(ctx);
    }

    pub fn remove_comment(ctx: Context<RemoveComment>) -> Result<()> {
        return _remove_comment(ctx);
    }
}
