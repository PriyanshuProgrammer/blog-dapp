use anchor_lang::prelude::*;

const MAX_BLOG_LEN: usize = 1000;
const MAX_BLOG_TITLE_LEN: usize = 100;

#[derive(AnchorSerialize, AnchorDeserialize, InitSpace, Clone)]
pub enum ReactionType{
    Like, 
    Dislike
}

#[derive(InitSpace)]
#[account]
pub struct Blog {
    #[max_len(MAX_BLOG_TITLE_LEN)]
    pub title: String,
    #[max_len(MAX_BLOG_LEN)]
    pub content: String,
    pub likes: i32,
    pub dislikes: i32,
}

#[derive(InitSpace)]
#[account]
pub struct Reaction{
    pub blog: Pubkey, 
    pub reaction: ReactionType, 
}