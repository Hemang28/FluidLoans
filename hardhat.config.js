require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.4",


  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: process.env.MUMBAI_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
},
solidity: {
  version: "0.8.17",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}
};