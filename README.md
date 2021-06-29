## ASK HiDE

This program developped based by https://github.com/kristoferlund/ic-wall Thanks to Kristofer Lund, kristofer@fmckl.se. Really helpful to understand ICP and Ethereum connections with React/NEXT envirement

## Purpose

This program handling Question and Answer among community member. current version designed for HiDE(hide.ac). but you can use it more commonly.

## Run locally

### 1. Prerequisites

Make sure you have the following installed:

```bash
node
npm
git

```

### 2. Install DFINITY Canister SDK

Download and install the DFINITY Canister SDK package by running the following command:

```bash
DFX_VERSION=0.7.1 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
```

### 3. Install Rust / Cargo

The app backend is written in Rust. The commands below install Rust, the package manager Cargo, etc.

```bash
curl https://sh.rustup.rs -sSf | sh
rustup update
rustup target add wasm32-unknown-unknown
sudo apt-get -y install cmake
cargo install ic-cdk-optimizer --root target
export PATH="./target/bin:$PATH"
```

### 4. Clone this repo, install dependencies

```bash
git clone https://github.com/kristoferlund/ic-wall.git
npm install
```

### 5. Run!

#### Terminal 1

Start Internet Computer

```bash
dfx start
```

#### Terminal 2

**Alt 1.** Development mode with hot reload

-   Deploy backend canisters
-   Run next.js frontend in dev mode

```bash
dfx deploy wall
dfx deploy profile
npm run dev
```

Access on [http://localhost:3000](http://localhost:3000)

**Alt 2.** Production mode

-   Export static production version of next.js frontend
-   Deploy all canisters

```bash
dfx deploy wall
dfx deploy profile
npm run export
dfx deploy ui
```

Access on [http://localhost:8000](http://localhost:8000)

In case you receive "Could not find Canister ID from Request":

-   Get UI canister ID

```bash
dfx canister id ui
```

Access on http://localhost:8000/?canisterId={id received in previous step}

### License

MIT
