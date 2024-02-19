# 🎟️ [NFTx Ticketing System Frontend](https://nft-ticketing-system.netlify.app/) 🎟️

## View Live Project At 🎟️ [NFTx Ticketing System](https://nft-ticketing-system.netlify.app/) 🎟️

## Description
NFT Ticketing System and proof-of-attendance system with wallet QR code scanning.

- Used the OpenZeppelin Solidity library to create NFT Smart Contract
- Anyone can mint the Tickets as NFT by paying the Mint Price
- NFT Smart Contract allows contract owner to open or close the NFT sale
- Users can check-in using their NFT Tickets, and it is saved in the contract. 
- Deployed Smart Contract to Rinkeby Testnet
- Hosted static assets on IFPS
- Created a React Dapp that interacts with the smart-contract ABI
- Confirms a wallet owns an NFT

## Get started

1. Clone the repo to you local system

```shell
git clone https://github.com/ShivaShanmuganathan/NFT-Ticketing-System-Frontend.git
```

2. Open the directory

```shell
cd NFT-Ticketing-System-Frontend
```

3. Install the required node modules

```shell
yarn install
```

4. Set the value of `REACT_APP_CONTRACT_ID` in `.env.development.local`

```shell

REACT_APP_CONTRACT_ID=0x1234567890
```

5. Start the development server

```shell
yarn start
```
