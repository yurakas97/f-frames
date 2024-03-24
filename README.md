# Farcaster Frames for Polymer by yurakas97

The repository contains 2 folders. "dapp" is responsible for the back-end side. And "my-frame" for creating and validating frames.

This project uses Frog.fm framework to create and process frames, and ERC721 token standards, oppenZeppelin lib. and custom solidity smart contracts.

**Utility:** The user can send transactions with messages from Base to Optimism through the frame using the IBC channel and interact with packet sending process over there. In this case, as the final step user got NFT on Optimism with the message they sent.

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

Use a second terminal or screen to there app.js server over there that will listen to requests from the frame validator and send packets through IBC.
```bash
node app.js
```
Return to the first terminal and go to "my-frame" dir.
```bash
npm install
npm run dev
```
It'll provide a user with a link(localhost:port) to run the frames validator and open the frame (/src/index.tsx) 

 
 ## Proof of interaction:

EVM wallet address: ```0x633DCc2b348D0343B8071ced530E3c32171Ce2B9```. 

Optimism Smart-contract: ```0xC1499C4e5b4fF3d14Bff12b25566d1EC1499265a```.

BASE Smart-contract: ```0x7aBa60FEeA75AA957d0d273cee847b29c8877dec```

tx of packet sending: https://base-sepolia.blockscout.com/tx/0x45e03ae3c5d2cac578c17da64714604a90fefc2ec8b65754b0b7ad9dcfcc9099?tab=index

tx of minting NFT with the message on Optimism: https://optimism-sepolia.blockscout.com/tx/0x38cd10299d738b66d70f1834c01a581bf57343322904056888e51d8a3d682ce8?tab=raw_trace

IBC channel: ```39374(Op)``` and ```39375(BASE)```
