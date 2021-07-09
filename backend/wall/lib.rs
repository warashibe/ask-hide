use ic_cdk::export::candid::Principal;
use ic_cdk::export::candid::{CandidType, Deserialize};
use ic_cdk::*;
use ic_cdk_macros::*;
use sha2::{Digest, Sha256};

type Wall = Vec<Post>;
type Admins = Vec<Principal>;

#[derive(Clone, Debug, CandidType, Deserialize)]
struct Answer {
    pub user: String,
    pub eth_address: String,
    pub text: String,
}

#[derive(Clone, Debug, CandidType, Deserialize)]
struct Post {
    pub id: String,
    pub user: String,
    pub eth_address: String,
    pub question: String,
    pub answers: Vec<Answer>,
}

#[init]
fn init() {
    let admins = storage::get_mut::<Admins>();
    admins.push(ic_cdk::caller());
    //crate::println!("{:?}", ic_cdk::api::caller());
}

#[update]
fn add_admin(principal: Principal) -> bool {
    if !is_caller_admin() {
        return false;
    }
    if is_admin(principal.clone()) {
        return false;
    }
    let admin = storage::get_mut::<Admins>();
    admin.push(principal);
    true
}

#[query]
fn get_my_principal() -> Principal {
    let p = ic_cdk::caller();
    p
}

#[query]
fn get_admin_list() -> &'static Vec<Principal> {
    storage::get::<Admins>()
}

#[query]
fn is_caller_admin() -> bool {
    is_admin(ic_cdk::caller())
}

#[query]
fn is_admin(principal: Principal) -> bool {
    crate::println!("{:?}", principal.clone());
    let admins = storage::get::<Admins>();
    crate::println!("{:?}", admins.clone());
    admins.contains(&principal)
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
        user: String::new(),
        eth_address: String::new(),
        question: String::new(),
        answers: Vec::new(),
    };
    void_post
}

#[update]
fn write(input: String, name: String, eth_address: String) -> String {
    let answers = Vec::new();
    let idnew = get_id(&input);
    let post = Post {
        id: idnew.clone(),
        user: name,
        eth_address: eth_address,
        question: input.clone(),
        answers: answers,
    };

    let wall = storage::get_mut::<Wall>();
    wall.push(post);
    idnew
}

#[update]
fn add_answer(text: String, name: String, eth_address: String, question_id: String) -> () {
    let answer = Answer {
        user: name,
        eth_address: eth_address,
        text,
    };
    let wall = storage::get_mut::<Wall>();
    for post in wall {
        if post.id == question_id {
            post.answers.push(answer.clone())
        }
    }
}

#[update]
fn clear_all_data() -> bool {
    if !is_caller_admin() {
        return false;
    }
    let wall = storage::get_mut::<Wall>();
    wall.clear();
    true
}
#[update]
fn clear_question(question_id: String) -> bool {
    if !is_caller_admin() {
        return false;
    }
    let wall = storage::get_mut::<Wall>();
    let idx: usize;
    match wall.iter().position(|p| *p.question == question_id) {
        Some(v) => idx = v,
        None => return false,
    }
    wall.remove(idx);
    true
}

#[pre_upgrade]
fn pre_upgrade() {
    let wall = get();
    let admins = get_admin_list();
    storage::stable_save((wall,)).unwrap();
    storage::stable_save((admins,)).unwrap();
    return;
}

#[post_upgrade]
fn post_upgrade() {
    // let wall = storage::get_mut::<Wall>();
    // let res: Result<(Vec<Post>,), String> = storage::stable_restore();
    // match res {
    //     Ok((old_posts,)) => {
    //         for post in old_posts {
    //             wall.push(post);
    //         }
    //         return;
    //     }
    //     Err(_) => return,
    // }
    let (wall_r, admins_r): (Vec<Post>, Vec<Principal>) = storage::stable_restore().unwrap();
    for p in wall_r {
        storage::get_mut::<Wall>().push(p);
    }
    for a in admins_r {
        storage::get_mut::<Admins>().push(a);
    }
}
