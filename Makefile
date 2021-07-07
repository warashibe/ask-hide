wall:
	cargo build --target wasm32-unknown-unknown --package wall --release
	ic-cdk-optimizer ./target/wasm32-unknown-unknown/release/wall.wasm -o ./target/wasm32-unknown-unknown/release/wall_opt.wasm