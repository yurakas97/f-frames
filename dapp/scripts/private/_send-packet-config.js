const { exec } = require("child_process");
const { getConfigPath, getWhitelistedNetworks } = require('./_helpers.js');
const { setupIbcPacketEventListener } = require('./_events.js');
const fs = require('fs');
const configPath = 'message-config.json';


let message = '';
for (let i = 2; i < process.argv.length; i++) {
  message += process.argv[i] + " ";
}
console.log(message)

const configData = {
  content: message
};
fs.writeFileSync(configPath, JSON.stringify(configData, null, 2));


function runSendPacketCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        reject(error);
      } else {
        console.log(stdout);
        resolve(true);
      }
    });
  });
}

async function runSendPacket(config) {
  const source = config.createChannel.srcChain;

  // Check if the source chain from user input is whitelisted
  const allowedNetworks = getWhitelistedNetworks();
  if (!allowedNetworks.includes(source)) {
    console.error("❌ Please provide a valid source chain");
    process.exit(1);
  }

  const script = config.isUniversal ? 'send-universal-message-info.js' : 'send-message-info.js';
  const command = `npx hardhat run scripts/message/${script} --network ${source}`;

  try {
    await setupIbcPacketEventListener();
    // if (config.isUniversal === true) {
    //     await setupUcXBallotNFTEventListener();
    // } else if (config.isUniversal === false) {
    //     await setupXBallotNFTEventListener();
    // } else {
    //     console.error("❌ Invalid config value for isUniversal. Please check your config file.");
    //     process.exit(1);
    // }
    await runSendPacketCommand(command);
  } catch (error) {
    console.error("❌ Error sending packet: ", error);
    process.exit(1);
  }
}

async function main() {
  const configPath = getConfigPath();
  const config = require(configPath);

  await runSendPacket(config);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});