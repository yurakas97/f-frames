# Farcaster Frames for Polymer by yurakas97

The repository contains 2 folders. "dapp" is responsible for the back-end side. And "my-frame" for creating and validating frames.

This project uses Frog.fm framework to create and process frames, and ERC721 token standards, oppenZeppelin lib. and custom solidity smart contracts.

**Utility:** The user can send transactions with messages from Base to Optimism through the frame using the IBC channel and interact with packet sending process over there.

How it works(video): https://www.youtube.com/watch?v=jljusQy0V7s


## 📋 Prerequisites


- Have [git](https://git-scm.com/downloads) installed
- Have [node](https://nodejs.org) installed (v20+)
- Have [Foundry](https://book.getfoundry.sh/getting-started/installation) installed (Hardhat will be installed when running `npm install`)
- Have [just](https://just.systems/man/en/chapter_1.html) installed (recommended but not strictly necessary)
- Have npm installed

Some basic knowledge of all of these tools is also required, although the details are abstracted away for basic usage.

## 💻 Installation

After cloning the repository: 
```bash 
git clone https://github.com/yurakas97/f-frames.git
```
run this command additionally:
```bash
npm install express
```
```bash
npm install -D typescript
```
```bash
npm install frog hono
```

To **run the back-end server**, there are a couple of things to do. (Assuming the dependencies have been installed). Go to "dapp" folder
```bash
cd dapp
```
Convert the `.env.example` file into an `.env` file.
```bash
cp .env.example .env
```
Add your private keys and config path:
```bash
CONFIG_PATH='config/message-dapp.json'
```

Once the configuration file is updated and saved, you can set and deploy contracts.

- ```nvm use 20```
- ```just set-contracts base BaseContract``` and
- ```just set-contracts optimism OptContract false```
- ```just deploy base optimism``` to deploy.
- ```just create-channel``` to create a custom IBC channel.

## 💻 How to run

Use a second terminal or screen to run there app.js server that will listen to requests from the frame validator and send packets through IBC.
```bash
node app.js
```
Return to the first terminal and go to "my-frame" dir.
```bash
npm install
npm run dev
```


  **Proof of interaction**:

EVM wallet address: ```0x633DCc2b348D0343B8071ced530E3c32171Ce2B9```. 

Optimism Smart-contract: ```0x1166a3269c9a766458C735B6E1F62ad461948960```.

BASE Smark-contract: ```0x3AEfecAa39018057E634dB71C580ca2b1196e17f```

tx of channel creating: https://optimism-sepolia.blockscout.com/tx/0x231664e10dfdc02a6c6f14035e84ca40ea8b1196211006df53c19257e15034ae

tx of packet sending: https://optimism-sepolia.blockscout.com/tx/0x571829ed0fc2607acae7c2e8f67367c6e9af4f0f680fc85c7d36d8cd369eadc1?tab=index

tx of minting NFT on BASE: https://base-sepolia.blockscout.com/tx/0x322c4c44dcc5d0615be0a69dd2cc16f119d7373cdb73e4538c28c7351ed998e0?tab=index

IBC channel: ```37850(Op)``` and ```37851(BASE)```
