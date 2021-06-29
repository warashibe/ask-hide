use ic_cdk::export::{
    candid::{CandidType, Deserialize},
    Principal,
};
use ic_cdk::*;
use ic_cdk_macros::*;
use sha2::{Digest, Sha256};

type Wall = Vec<Post>;

#[derive(Clone, Debug, CandidType, Deserialize)]
struct Answer {
    pub user: Principal,
    pub text: String,
}

#[derive(Clone, Debug, CandidType, Deserialize)]
struct Post {
    pub id: String,
    pub user: Principal,
    pub question: String,
    pub answers: Vec<Answer>,
}

fn to_string(src: &[u8]) -> String {
    src.into_iter().map(|val| format!("{:0>2x}", val)).collect()
}

fn get_id(now_str: &String) -> String {
    let mut hasher = Sha256::new();
    let now: String = now_str.parse().unwrap();
    hasher.update(now);
    let short_id = hasher.finalize();
    let b64_url = base64::encode_config(&short_id, base64::URL_SAFE);
    b64_url
}

#[query]
fn get() -> &'static Vec<Post> {
    storage::get::<Wall>()
}

#[query]
fn get_question(question_id: String) -> Post {
    let wall = storage::get::<Wall>();

    for post in wall {
        if post.id == question_id {
            return post.clone();
        }
    }
    let void_post = Post {
        id: String::new(),
        user: ic_cdk::caller(),
        question: String::new(),
        answers: Vec::new(),
    };
    void_post
}

fn get_null_post() -> Post {
    let principal_id = ic_cdk::caller();
    let answers = Vec::new();
    let idnew = "0".to_string();
    let text = "".to_string();
    let post = Post {
        id: idnew,
        user: principal_id,
        question: text,
        answers,
    };
    post
}

#[update]
fn write(input: String) -> String {
    let principal_id = ic_cdk::caller();
    let answers = Vec::new();
    let idnew = get_id(&input);
    let post = Post {
        id: idnew.clone(),
        user: principal_id,
        question: input.clone(),
        answers: answers,
    };

    let wall = storage::get_mut::<Wall>();
    wall.push(post);
    idnew
}

#[update]
fn add_answer(text: String, question_id: String) -> () {
    let principal_id = ic_cdk::caller();
    let answer = Answer {
        user: principal_id,
        text,
    };
    let wall = storage::get_mut::<Wall>();
    for post in wall {
        if post.id == question_id {
            post.answers.push(answer.clone())
        }
    }
}

#[query]
fn clear_data() {
    let wall = storage::get_mut::<Wall>();
    wall.clear();
}

#[pre_upgrade]
fn pre_upgrade() {
    let wall = get();
    storage::stable_save((wall,)).unwrap();
    return;
}

#[post_upgrade]
fn post_upgrade() {
    let wall = storage::get_mut::<Wall>();

    let res: Result<(Vec<Post>,), String> = storage::stable_restore();
    match res {
        Ok((old_posts,)) => {
            for post in old_posts {
                wall.push(post);
            }
            return;
        }
        Err(_) => return,
    }
}
