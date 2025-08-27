use anchor_lang::prelude::*;

const MAX_BLOG_LEN: usize = 1000;
const MAX_BLOG_TITLE_LEN: usize = 100;
const MAX_COMMENT_LEN: usize = 100;

#[derive(AnchorSerialize, AnchorDeserialize, InitSpace, Clone, PartialEq)]
pub enum ReactionType {
    Like,
    Dislike,
}

#[error_code]
pub enum Errors {
    #[msg("The reaction is already initialized")]
    ReactionReinitialize,
}

#[derive(InitSpace)]
#[account]
pub struct Blog {
    pub blog_author: Pubkey,
    #[max_len(MAX_BLOG_TITLE_LEN)]
    pub title: String,
    #[max_len(MAX_BLOG_LEN)]
    pub content: String,
    pub likes: i32,
    pub dislikes: i32,
    pub comment_counter: i32,
}

#[derive(InitSpace)]
#[account]
pub struct Reaction {
    pub blog: Pubkey,
    pub reaction_author: Pubkey,
    pub reaction: ReactionType,
}

#[derive(InitSpace)]
#[account]
pub struct Comment {
    pub blog: Pubkey,
    pub comment_author: Pubkey,
    #[max_len(MAX_COMMENT_LEN)]
    pub comment: String,
    pub index: i32,
}
