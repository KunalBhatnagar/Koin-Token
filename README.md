# Koiners Web3 Decentralized Application

## Project Description

This is a Web3 decentralized application built on the Internet Computer blockchain, featuring Internet Identity for user authentication. The application uses a custom token called **Koiners** and includes a faucet that allows logged-in users to claim **10,000 Koiners**. 

In this app, users can:
- Check their balance of Koiners.
- Transfer Koiners to another account.

The total supply of Koiners is **1 billion**, with the principal owner holding **500 million Koiners** and the local canister holding another **500 million Koiners**. When a new user logs in using Internet Identity, they are credited with **10,000 Koiners** from the local canister.

## Technical Details

### Frontend
- Built with **React** for a smooth user experience.
- Styled using **HTML** and **CSS**.

### Backend
- Written in **Motoko** for the Internet Computer blockchain.
- Local canister stores **500 million Koiners**, with a total supply of **1 billion**.
- The principal owner holds **500 million Koiners**.
- The faucet gives **10,000 Koiners** to each new user upon login.

### Blockchain & Deployment
- Deployed on the **Internet Computer blockchain** using **Motoko** for smart contract logic.
- The front end interacts with the backend via canisters for token transactions.

## Features
- **Internet Identity Authentication**: Secure login for users via Internet Identity.
- **Token Faucet**: New users receive 10,000 Koiners upon logging in.
- **Balance Tracking**: Users can check their Koiners balance.
- **Token Transfers**: Users can transfer Koiners to other accounts.

## Installation

To run the application locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/koiners-dapp.git
    cd koiners-dapp
    ```

2. Install dependencies:

    For the frontend (React app):
    ```bash
    npm install
    ```

    For the Motoko backend (canister):
    ```bash
    dfx new <project-name>
    ```

3. Start the local canister:

    ```bash
    dfx start
    ```

4. Run the frontend:

    ```bash
    npm start
    ```

5. Access the application at `http://localhost:8080`.

## Contributing

Feel free to open issues and submit pull requests. Contributions are welcome!






# Check your Balance

1. Find out your principal id:

```
dfx identity get-principal
```

2. Save it somewhere.

e.g. My principal id is: jrriz-ulkpb-dbprv-xw2yz-tvm5w-6vqve-4c2dh-f3sfh-iquts-7cweb-2qe


3. Format and store it in a command line variable:
```
OWNER_PUBLIC_KEY="principal \"$( \dfx identity get-principal )\""
```

4. Check that step 3 worked by printing it out:
```
echo $OWNER_PUBLIC_KEY
```

5. Check the owner's balance:
```
dfx canister call token balanceOf "( $OWNER_PUBLIC_KEY )"
```

# Charge the Canister


1. Check canister ID:
```
dfx canister id token
```

2. Save canister ID into a command line variable:
```
CANISTER_PUBLIC_KEY="principal \"$( \dfx canister id token )\""
```

3. Check canister ID has been successfully saved:
```
echo $CANISTER_PUBLIC_KEY
```

4. Transfer half a billion tokens to the canister Principal ID:
```
dfx canister call token transfer "($CANISTER_PUBLIC_KEY, 500_000_000)"
```

# Deploy the Project to the Live IC Network

1. Create and deploy canisters:

```
dfx deploy --network ic
```

2. Check the live canister ID:
```
dfx canister --network ic id token
```

3. Save the live canister ID to a command line variable:
```
LIVE_CANISTER_KEY="principal \"$( \dfx canister --network ic id token )\""
```

4. Check that it worked:
```
echo $LIVE_CANISTER_KEY
```

5. Transfer some tokens to the live canister:
```
dfx canister --network ic call token transfer "($LIVE_CANISTER_KEY, 50_000_000)"
```

6. Get live canister front-end id:
```
dfx canister --network ic id token_assets
```
7. Copy the id from step 6 and add .raw.ic0.app to the end to form a URL.
e.g. zdv65-7qaaa-aaaai-qibdq-cai.raw.ic0.app
