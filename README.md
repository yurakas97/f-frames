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

To run the back-end server, there are a couple of things to do. (Assuming the dependencies have been installed). Go to dapp folder
```bash
cd dapp
```

1. Convert the `.env.example` file into an `.env` file.
```bash
cp .env.example .env
```
Add your private keys and update the other values if you want to customize (advanced usage feature).

3. Check out the configuration file; `config.json` or the alternate configs in the `/config` directory. Depending on which application you'll want to interact with, update the contract type in the `deploy` field to the desired contract (use the `just set-contracts` recipe for that).

4. Once the configuration file is updated and saved, you can look at the `just` commands with `just --list`.

## 💻 How to run

1. Place this repo on the local server with the required dependencies installed. And run the next commands in the CLI.
2. ```cp .env.example .env``` set up private keys and APIs, then
3. ```CONFIG_PATH='config/jokes-config.json' ```  
4. ```nvm use 20```

**There're couple ways to run and interact, option 5 or 6 or 7:**

5. Run just file to put everything together: ```just do-it``` (will cover all functionality: contract deployment, channel creation, NFT minting and packet sending)
6. Run a contract creating and deployment:
- ```just set-contracts optimism OptContract``` and
- ```just set-contracts base BaseContract false```
- ```just deploy optimism base``` to deploy.
- ```just create-channel``` to create a custom IBC channel.
- Then run ```just do-it-main``` as many times as you wish to create and bridge Joke NFT through IBC.
7. Use the Live Server extension (VSCode) to run or just open the ```interface/index.html``` file through the browser to start the UI/UX interface
- Run a local server ```node app.js``` that listens to requests from the web page and sends packets through IBC.
- Go to the web page and interact with the UI/UX interface that does the same as above.

  **Proof of interaction**:

EVM wallet address: ```0x633DCc2b348D0343B8071ced530E3c32171Ce2B9```. 

Optimism Smart-contract: ```0x1166a3269c9a766458C735B6E1F62ad461948960```.

BASE Smark-contract: ```0x3AEfecAa39018057E634dB71C580ca2b1196e17f```

tx of channel creating: https://optimism-sepolia.blockscout.com/tx/0x231664e10dfdc02a6c6f14035e84ca40ea8b1196211006df53c19257e15034ae

tx of packet sending: https://optimism-sepolia.blockscout.com/tx/0x571829ed0fc2607acae7c2e8f67367c6e9af4f0f680fc85c7d36d8cd369eadc1?tab=index

tx of minting NFT on BASE: https://base-sepolia.blockscout.com/tx/0x322c4c44dcc5d0615be0a69dd2cc16f119d7373cdb73e4538c28c7351ed998e0?tab=index

IBC channel: ```37850(Op)``` and ```37851(BASE)```
