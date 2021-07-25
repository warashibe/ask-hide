use ic_cdk::export::candid::Principal;
use ic_cdk::export::candid::{CandidType, Deserialize};
use ic_cdk::storage;
use ic_cdk::*;
use ic_cdk_macros::*;
use sha2::{Digest, Sha256};
use std::collections::BTreeMap;

type Wall = Vec<Post>;
type Admins = Vec<Principal>;
type Addresses = BTreeMap<String, String>;
static mut OWNER: Option<Principal> = None;

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
    unsafe{
        OWNER = Some(ic_cdk::caller());
    }
    let admins = storage::get_mut::<Admins>();
    admins.push(ic_cdk::caller());
}

#[query]
fn get_my_principal() -> Principal {
    let p = ic_cdk::caller();
    p
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
    let address_hash = get_id(&eth_address);

    let post = Post {
        id: idnew.clone(),
        user: name,
        eth_address: address_hash.clone(),
        question: input.clone(),
        answers: answers,
    };
    storage::get_mut::<Wall>().push(post);
    storage::get_mut::<Addresses>().insert(address_hash, eth_address);
    idnew
}

#[update]
fn add_answer(text: String, name: String, eth_address: String, question_id: String) -> () {
    let address_hash = get_id(&eth_address);
    let answer = Answer {
        user: name,
        eth_address: address_hash.clone(),
        text,
    };
    let wall = storage::get_mut::<Wall>();
    for post in wall {
        if post.id == question_id {
            post.answers.push(answer.clone())
        }
    }
    storage::get_mut::<Addresses>().insert(address_hash, eth_address);
}

//Admin commands
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
fn get_admin_list() -> Option<&'static Vec<Principal>> {
    if !is_caller_admin() {
        return None;
    }
    Some(storage::get::<Admins>())
}

#[query]
fn is_caller_admin() -> bool {
    is_admin(ic_cdk::caller())
}
fn is_caller_owner(principal: &Principal) -> bool {
    match OWNER{
        Some(o) => return *principal == OWNER.unwrap(),
        None => return false,
    }
}

#[query]
fn is_admin(principal: Principal) -> bool {
    crate::println!("{:?}", principal.clone());
    let admins = storage::get::<Admins>();
    crate::println!("{:?}", admins.clone());
    admins.contains(&principal) || is_caller_owner(&principal)
}

#[update]
fn delete_all_data() -> bool {
    if !is_caller_admin() {
        return false;
    }
    let wall = storage::get_mut::<Wall>();
    wall.clear();
    true
}
#[update]
fn delete_question(question_id: String) -> bool {
    if !is_caller_admin() {
        return false;
    }
    let wall = storage::get_mut::<Wall>();
    let idx: usize;
    match wall.iter().position(|p| p.id == question_id) {
        Some(v) => idx = v,
        None => return false,
    }
    crate::println!("{:?}", idx.clone());
    wall.remove(idx);
    true
}

#[update]
fn delete_answer(question_id: String, answer_idx: usize) -> bool {
    if !is_caller_admin() {
        return false;
    }
    let wall = storage::get_mut::<Wall>();
    let idx: usize;
    match wall.iter().position(|p| p.id == question_id) {
        Some(v) => idx = v,
        None => return false,
    }

    if wall.clone()[idx].answers.len() > answer_idx {
        wall[idx].answers.remove(answer_idx);
        return true;
    }
    false
}

#[pre_upgrade]
fn pre_upgrade() {
    let wall = storage::get::<Wall>();
    let admins = storage::get::<Admins>();
    let addresses = storage::get::<Addresses>();
    storage::stable_save((wall, admins, addresses)).unwrap();
    return;
}

#[post_upgrade]
fn post_upgrade() {
    let wall = storage::get_mut::<Wall>();
    let admins = storage::get_mut::<Admins>();
    let addresses = storage::get_mut::<Addresses>();
    let res: Result<(Vec<Post>, Vec<Principal>, BTreeMap<String, String>), String> =
        storage::stable_restore();
    match res {
        Ok((old_posts, old_admins, old_addresses)) => {
            for post in old_posts {
                wall.push(post);
            }
            for admin in old_admins {
                admins.push(admin);
            }
            for (k, v) in old_addresses {
                addresses.insert(k, v);
            }

            return;
        }
        Err(_) => return,
    }
}
